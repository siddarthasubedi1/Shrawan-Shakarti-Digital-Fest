from Register.views import (
    RegistrationView,
    DeleteUser,
    LoginUser,
    LogoutUser,
    UserProfile,
)

from django.urls import path

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("register/delete/<int:pk>/", DeleteUser.as_view(), name="delete-user"),
    path("login/", LoginUser.as_view(), name="login_user"),
    path("logout/", LogoutUser.as_view(), name="logout_user"),
    path("profile/", UserProfile.as_view(), name="profile"),
]
