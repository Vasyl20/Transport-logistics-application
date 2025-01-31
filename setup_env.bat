@echo off
chcp 65001 >nul

echo Створення віртуального середовища...
python -m venv env

echo Активація середовища...
call env\Scripts\activate

echo Встановлення залежностей...
pip install -r env/requirements.txt

echo Готово!
pause
