from Register.serializers import RegisterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Register.models import MyUser
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password


# ✅ TOKEN GENERATOR
def get_tokens_for_user(user):
    if not user.is_active:
        raise AuthenticationFailed("User is not active")

    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# ✅ REGISTER
class RegistrationView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(
                {
                    "token": token,
                    "message": "User registered successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Failed to register user", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


# ✅ LOGIN
class LoginUser(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = MyUser.objects.get(email=email)

            if user.check_password(password):
                token = get_tokens_for_user(user)

                return Response(
                    {
                        "token": token,
                        "message": "Login successful",
                        "has_seen_surprise": user.has_seen_surprise,
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"errors": "Email or password is invalid"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except MyUser.DoesNotExist:
            return Response(
                {"message": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )


# ✅ SURPRISE VIEW
class SurpriseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # if user.has_seen_surprise:
        #     return Response(
        #         {"message": "You have already seen the surprise 💚"},
        #         status=status.HTTP_200_OK,
        #     )

        return Response(
            {
                "title": "🌿 Happy Shrawan 🌿",
                "message": f"""
                Dear {user.first_name} 💚,
                In this beautiful month of Shrawan,
                I just want to say you are the most special gift in my life.
                May this rain bring happiness, peace and endless love to you 🌧️✨
                """,
            }
        )

    def post(self, request):
        user = request.user
        user.has_seen_surprise = True
        user.save()

        return Response(
            {"message": "Surprise marked as seen ✅"},
            status=status.HTTP_200_OK,
        )


# ✅ PROFILE
class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = RegisterSerializer(request.user)
        return Response(
            {
                "message": "Profile fetched successfully",
                "data": serializer.data,
            }
        )

    def put(self, request):
        user = request.user
        serializer = RegisterSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Profile updated successfully",
                    "data": serializer.data,
                }
            )

        return Response(serializer.errors, status=400)


# ✅ LOGOUT
class LogoutUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout successful"},
                status=status.HTTP_205_RESET_CONTENT,
            )

        except Exception:
            return Response(
                {"errors": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response({"error": "Both fields are required"}, status=400)

        if not check_password(old_password, user.password):
            return Response({"error": "Old password is incorrect"}, status=400)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully ✅"}, status=200)
