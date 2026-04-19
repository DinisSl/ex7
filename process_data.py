from django.utils import timezone
from votacao.models import Questao, Opcao


# a)
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


# b)
def testar_alinea_a_b():
        print("\n--- Teste Alíneas a) e b) ---")


        apagar_todas_questoes()


        criar_questao(
            "Qual é a tua cor favorita?",
            [
                ["Azul", 5],
                ["Verde", 3],
                ["Vermelho", 2],
                ["Cor de Rosa", 5]
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
                ["Laravel", 1],
                ["Spring", 0]
            ]
        )

# c)
def apagar_todas_questoes():
    Questao.objects.all().delete()
    print("Todas as questões foram apagadas")

def testar_alinea_c():
    print("\n--- Teste Alínea c) ---")
    apagar_todas_questoes()


# d)
def mostrar_questao(questao):
    print(f"\nQuestão: {questao.questao_texto}")
    print("Opções:")

    opcoes = questao.opcao_set.all()

    if not opcoes:
        print("  (Sem opções registadas)")
        return

    for opcao in opcoes:
        print(f" - {opcao.opcao_texto} ({opcao.votos} votos)")

#def testar_alinea_d():
#   print("\n--- Teste Alínea d) ---")
#   for q in Questao.objects.all():
#       mostrar_questao(q)

# e)
def mostrar_todas_questoes():
    questoes = Questao.objects.all()

    for q in questoes:
        mostrar_questao(q)

# f)
def mostrar_questoes_com_prefixo(prefixo):
    questoes = Questao.objects.filter(questao_texto__startswith=prefixo)

    if  not questoes:
        print(f"Não foram encontradas questões que começam por '{prefixo}'.")
        return

    for q in questoes:
        mostrar_questao(q)


# g)
def mostrar_opcao_mais_votada(questao):
    opcoes = questao.opcao_set.all()

    if not opcoes:
        print(f"A questão '{questao.questao_texto}' não tem opções.")
        return

    max_votos = 0
    for opcao in opcoes:
        if opcao.votos > max_votos:
            max_votos = opcao.votos

    opcoes_vencedoras = []
    for opcao in opcoes:
        if opcao.votos == max_votos:
            opcoes_vencedoras.append(opcao)

    print(f"\nQuestão: {questao.questao_texto}")
    print("Opção(ões) com mais votos:")
    for op in opcoes_vencedoras:
        print(f" -> {op.opcao_texto} ({op.votos} votos)")


def testar_alinea_g():
    print("\n--- Teste Alínea g) ---")
    questoes = Questao.objects.all()
    for q in questoes:
        mostrar_opcao_mais_votada(q)

# h)
def total_votos_bd():
    opcoes = Opcao.objects.all()
    total = 0

    for opcao in opcoes:
        total += opcao.votos

    return total


def testar_alinea_h():
    print("\n--- Teste Alínea h) ---")
    total = total_votos_bd()
    print("O número total de votos registados na BD é: ", total)


# EXECUTAR OS TESTES

testar_alinea_a_b()
# testar_alinea_c()
#testar_alinea_d()
#testar_alinea_g()
#testar_alinea_h()
#mostrar_questoes_com_prefixo("qua")
mostrar_todas_questoes()