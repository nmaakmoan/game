from rest_framework import serializers
from .models import Character


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = [
            "id",
            "name",
            "character_class",
            "level",
            "weapon",
            "description",
        ]

    def validate_name(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Имя должно содержать минимум 3 символа."
            )

        return value

    def validate_level(self, value):
        if value < 1 or value > 100:
            raise serializers.ValidationError(
                "Уровень должен быть от 1 до 100."
            )

        return value

    def validate_description(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Описание не должно быть пустым."
            )

        return value
