from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from datetime import date


class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        first_name,
        last_name,
        term_condition,
        date_of_birth=None,
        photo=None,
        password=None,
    ):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            term_condition=term_condition,
            date_of_birth=date_of_birth,
            photo=photo,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email,
        first_name,
        last_name,
        term_condition,
        password=None,
    ):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            term_condition=term_condition,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)

    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    date_of_birth = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to="profile_photos/", null=True, blank=True)

    term_condition = models.BooleanField(default=False)

    # ✅ NEW FIELD (IMPORTANT)
    has_seen_surprise = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "term_condition"]

    @property
    def age(self):
        if self.date_of_birth:
            today = date.today()
            return (
                today.year
                - self.date_of_birth.year
                - (
                    (today.month, today.day)
                    < (
                        self.date_of_birth.month,
                        self.date_of_birth.day,
                    )
                )
            )
        return None

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin