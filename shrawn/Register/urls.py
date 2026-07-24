from Register.views import (
    RegistrationView,
    LoginUser,
    LogoutUser,
    UserProfile,
    SurpriseView,
)

from django.urls import path

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("login/", LoginUser.as_view(), name="login_user"),
    path("logout/", LogoutUser.as_view(), name="logout_user"),
    path("profile/", UserProfile.as_view(), name="profile"),
    path("surprise/", SurpriseView.as_view(), name="surprise"),
]