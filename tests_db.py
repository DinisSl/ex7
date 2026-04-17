from votacao.models import Questao, Opcao
from django.utils import timezone

def create_sample_question():
    q = Questao.objects.create(questao_texto="Qual o teu clube favorito?",
                                pub_data=timezone.now())
    q.opcao_set.create(opcao_texto="Benfica", votos=3)
    q.opcao_set.create(opcao_texto="Sporting", votos=5)
    q.opcao_set.create(opcao_texto="Porto", votos=1)
create_sample_question()