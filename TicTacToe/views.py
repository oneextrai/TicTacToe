from django.shortcuts import render

def home(request):
    return render(request, 'TicTacToe/base.html')