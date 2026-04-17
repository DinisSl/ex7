# Importa os teus modelos da app 'votacao'
from votacao.models import Questao, Opcao


# ==========================================
# ALÍNEA G) - Mostrar opção com mais votos
# ==========================================
def mostrar_opcao_mais_votada(questao):
    # O Django usa '_set' baseado no nome do modelo associado em minúsculas
    opcoes = questao.opcao_set.all()

    if not opcoes:
        print(f"A questão '{questao.texto_da_questao}' não tem opções.")
        return

    # Descobrir o número máximo de votos
    max_votos = max(opcao.votos for opcao in opcoes)

    # Encontrar todas as opções com esse número (para o caso de haver empates) [cite: 33]
    opcoes_vencedoras = [opcao for opcao in opcoes if opcao.votos == max_votos]

    print(f"\nQuestão: {questao.texto_da_questao}")
    print("Opção(ões) com mais votos:")
    for op in opcoes_vencedoras:
        print(f" -> {op.texto_da_opcao} ({op.votos} votos)")


def testar_alinea_g():
    print("\n--- Teste Alínea g) ---")
    questoes = Questao.objects.all()
    # Testar a função invocando-a para todas as questões em BD [cite: 34]
    for q in questoes:
        mostrar_opcao_mais_votada(q)


# ==========================================
# ALÍNEA H) - Obter número total de votos
# ==========================================
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


# ==========================================
# EXECUTAR OS TESTES
# ==========================================
testar_alinea_g()
testar_alinea_h()