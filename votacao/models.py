from django.db import models

class Questao(models.Model):
    questao_texto = models.CharField(max_length=200)
    pub_data = models.DateTimeField('data de publicacao')

class Opcao(models.Model):
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=200)
    votos = models.IntegerField(default=0)