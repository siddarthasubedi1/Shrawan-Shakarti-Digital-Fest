from django.shortcuts import render
from Register.serializers import RegisterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import APIView
from Register.models import MyUser
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated


# token generator function
def get_tokens_for_user(user):
    if not user.is_active:
        raise AuthenticationFailed("User is not active")

    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class RegistrationView(APIView):
    def get(self, request):
        user = MyUser.objects.all()
        serializer = RegisterSerializer(user, many=True)
        return Response(
            {"message": "All registered user", "data": serializer.data},
            status=status.HTTP_200_OK,
        )

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


class DeleteUser(APIView):
    def delete(self, request, pk):
        try:
            user = MyUser.objects.get(pk=pk)
            user.delete()
            return Response(
                {"message": "User deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except MyUser.DoesNotExist:
            return Response(
                {"message": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        except IntegrityError:
            return Response(
                {"message": "Cannot delete user because related records exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class LoginUser(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = MyUser.objects.get(email=email)

            if user is not None and user.check_password(password):

                token = get_tokens_for_user(user)

                return Response(
                    {"token": token, "message": "Login successful"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"errors": "Email or password is invalid"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except MyUser.DoesNotExist:
            return Response(
                {"message": "user doesnot exit"}, status=status.HTTP_404_NOT_FOUND
            )


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
                {"errors": "Invalid token, something went wrong"},
                status=status.HTTP_400_BAD_REQUEST,
            )


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
