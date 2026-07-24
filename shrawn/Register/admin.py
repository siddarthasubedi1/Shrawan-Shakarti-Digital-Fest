from django.contrib import admin
from Register.models import MyUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserModelAdmin(BaseUserAdmin):
    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "is_admin",
        "date_of_birth",
        "age",
        "photo",
    )
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email",
                    "first_name",
                    "last_name",
                    "date_of_birth",
                    "age",
                    "photo",
                    "password1",
                    "password2",
                ],
            },
        ),
    ]
    search_fields = ("email", "first_name")
    readonly_fields = ("id",)

    ordering = ("email", "first_name")
    filter_horizontal = []
    list_filter = ()
    fieldsets = ()


admin.site.register(MyUser, UserModelAdmin)
