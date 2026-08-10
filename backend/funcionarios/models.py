from django.db import models

class Funcionario(models.Model):
    nome = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True)
    cargo = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome