from django.db import models


class Character(models.Model):
    CLASS_CHOICES = [
        ("Воин", "Воин"),
        ("Маг", "Маг"),
        ("Лучник", "Лучник"),
        ("Разбойник", "Разбойник"),
    ]

    WEAPON_CHOICES = [
        ("Меч", "Меч"),
        ("Посох", "Посох"),
        ("Лук", "Лук"),
        ("Кинжал", "Кинжал"),
    ]

    name = models.CharField(max_length=100)
    character_class = models.CharField(
        max_length=50,
        choices=CLASS_CHOICES
    )
    level = models.PositiveIntegerField()
    weapon = models.CharField(
        max_length=50,
        choices=WEAPON_CHOICES
    )
    description = models.TextField()

    def __str__(self):
        return self.name
