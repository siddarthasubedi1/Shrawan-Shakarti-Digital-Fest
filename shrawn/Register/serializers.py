from rest_framework import serializers
from Register.models import MyUser


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    age = serializers.ReadOnlyField()

    class Meta:
        model = MyUser
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "term_condition",
            "date_of_birth",
            "photo",
            "age",
            "password",
            "password2",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "date_of_birth": {"required": True},
            "photo": {"required": True},
        }

    def validate_email(self, value):
        if MyUser.objects.filter(email=value).exists():
            raise serializers.ValidationError({"errors": "Email is already in use."})
        return value

    def validate(self, attrs):

        password = attrs.get("password")
        password2 = attrs.get("password2")

        if password != password2:
            raise serializers.ValidationError({"errors": "Passwords do not match."})

        if len(password) < 8:
            raise serializers.ValidationError(
                {"errors": "Password must be at least 8 characters long."}
            )

        if attrs.get("term_condition") is not True:
            raise serializers.ValidationError(
                {"errors": "You must accept the terms and conditions."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")

        return MyUser.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            term_condition=validated_data["term_condition"],
            date_of_birth=validated_data.get("date_of_birth"),
            photo=validated_data.get("photo"),
            password=validated_data["password"],
        )


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = MyUser
        fields = ["email", "password"]


class UserLogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
