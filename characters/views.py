from rest_framework import generics
from .models import Character
from .serializers import CharacterSerializer


class CharacterCreateView(generics.CreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
