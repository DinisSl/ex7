
from django.utils import timezone
from votacao.models import Questao, Opcao


# Criar Questao
def criar_questao(texto_questao, lista_de_opcoes):

    questao = Questao.objects.create(questao_texto=texto_questao,pub_data=timezone.now())


    for opcao in lista_de_opcoes:
        texto_opcao = opcao[0]
        votos_opcao = opcao[1]

        Opcao.objects.create(
            questao=questao,
            opcao_texto=texto_opcao,
            votos=votos_opcao
        )

    print(f"Questão '{texto_questao}' criada com sucesso!")


# Testes
def testar_alinea_a_b():
        print("\n--- Teste Alíneas a) e b) ---")


        apagar_todas_questoes()


        criar_questao(
            "Qual é a tua cor favorita?",
            [
                ["Azul", 5],
                ["Verde", 3],
                ["Vermelho", 2]
            ]
        )

        criar_questao(
            "Qual é o teu desporto favorito?",
            [
                ["Futebol", 10],
                ["Basquetebol", 4]
            ]
        )


        criar_questao(
            "Qual a linguagem essencial para a criacao de Websites?",
            [
                ["CSS", 5],
                ["HTML", 8],
                ["JavaScript", 2],
                ["Python", 1]
            ]
        )

        criar_questao(
            "Qual o framework utilizado para a criacao deste projeto?",
            [
                ["Django", 10],
                ["Python", 3],
                ["SQL", 1],
                ["CSS", 0]
            ]
        )

#  Apagar todas as questões da BD

def apagar_todas_questoes():
    Questao.objects.all().delete()
    print("Todas as questões foram apagadas")

def testar_alinea_c():
    print("\n--- Teste Alínea c) ---")
    apagar_todas_questoes()


#  Mostrar uma questão completa

def mostrar_questao(questao):
    print(f"\nQuestão: {questao.questao_texto}")
    print("Opções:")

    opcoes = questao.opcao_set.all()

    if not opcoes:
        print("  (Sem opções registadas)")
        return

    for opcao in opcoes:
        print(f" - {opcao.opcao_texto} ({opcao.votos} votos)")

def testar_alinea_d():
    print("\n--- Teste Alínea d) ---")
    for q in Questao.objects.all():
        mostrar_questao(q)


#  Mostrar opção com mais votos

def mostrar_opcao_mais_votada(questao):
    # O Django usa '_set' baseado no nome do modelo associado em minúsculas
    opcoes = questao.opcao_set.all()

    if not opcoes:
        print(f"A questão '{questao.questao_texto}' não tem opções.")
        return

    # Descobrir o número máximo de votos
    max_votos = max(opcao.votos for opcao in opcoes)

    # Encontrar todas as opções com esse número (para o caso de haver empates) [cite: 33]
    opcoes_vencedoras = [opcao for opcao in opcoes if opcao.votos == max_votos]

    print(f"\nQuestão: {questao.questao_texto}")
    print("Opção(ões) com mais votos:")
    for op in opcoes_vencedoras:
        print(f" -> {op.opcao_texto} ({op.votos} votos)")


def testar_alinea_g():
    print("\n--- Teste Alínea g) ---")
    questoes = Questao.objects.all()
    # Testar a função invocando-a para todas as questões em BD [cite: 34]
    for q in questoes:
        mostrar_opcao_mais_votada(q)


#  Obter número total de votos

def total_votos_bd():
    opcoes = Opcao.objects.all()
    total = 0

    # Obter o número total iterando sobre todas as opções registadas
    for opcao in opcoes:
        total += opcao.votos

    return total


def testar_alinea_h():
    print("\n--- Teste Alínea h) ---")
    total = total_votos_bd()
    print(f"O número total de votos registados na BD é: {total}")



# EXECUTAR OS TESTES

testar_alinea_a_b()
#testar_alinea_c()
testar_alinea_d()
testar_alinea_g()
testar_alinea_h()