# CRUD FUNCIONÁRIOS

Projeto desenvolvido com o objetivo de praticar e aprimorar conceitos de backend utilizando **Django e Django REST Framework**, além de conceitos de frontend utilizando **React**.


## RUN DE DESENVOLVIMENTO

### /FRONTEND
 
* Instalação de dependências
~~~cmd
npm i
~~~

* Rodar o servidor
~~~cmd
npm run dev
~~~

### /BACKEND

* Criação do ambiente virtual
~~~cmd
python -m venv venv
~~~

* Ativação do ambiente virtual
~~~cmd
venv\Scripts\activate
~~~

* Instalação de dependências
~~~cmd
pip install -r requirements.txt
~~~

* Aplicar as migrations
~~~cmd
python manage.py makemigrations
python manage.py migrate
~~~

* Rodar o servidor
~~~cmd
python manage.py runserver
~~~
<br>

## BUILD REACT + DJANGO

* ### /FRONTEND

Altere o seguinte arquivo no seu projeto React:

### vite.config.js
~~~javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  base: '/static/',

  build: {
    outDir: path.resolve(__dirname, '../backend/frontend'),
    emptyOutDir: true,
  },
})
~~~


* ### /BACKEND
Para rodar o react junto com o Django, realize as seguintes alterações nos arquivos base do projeto Django:

### settings.py
~~~python
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

FRONTEND_DIR = BASE_DIR / "frontend"

STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_DIRS = [
    FRONTEND_DIR,
]
~~~
***

### views.py

~~~python
from django.views.generic import TemplateView

class ReactAppView(TemplateView):
    template_name = "index.html"
~~~
***

### urls.py
~~~python
from django.contrib import admin
from django.urls import include, path
from .views import ReactAppView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("funcionarios.urls")),
    path("", ReactAppView.as_view(), name="react"),
]
~~~
<br>

## RUN INTEGRADO DO PROJETO

Detro da pasta FRONTEND execute o seguinte comando:
~~~cmd
npm run build
~~~

Ao finalizar, excute dentro da pasta BACKEND os seguintes comandos (com a VENV ativa):

~~~cmd
python manage.py collectstatic

python manage.py runserver
~~~


