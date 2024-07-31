document.addEventListener('DOMContentLoaded', function() {
    // Carregar e inserir o header
    fetch('partials/admin-header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('admin-header').innerHTML = data;
        });

    // Carregar e inserir o footer
    fetch('partials/admin-footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('admin-footer').innerHTML = data;
        });

        // Verificar se estamos na página de Gerenciamento de Usuários
    if (window.location.pathname.endsWith('users.html')) {
        // Simular dados de usuários
        let users = [
            { id: 1, name: 'Usuário 1', email: 'user1@example.com', role: 'Jornalista' },
            { id: 2, name: 'Usuário 2', email: 'user2@example.com', role: 'Editor' },
            { id: 3, name: 'Usuário 3', email: 'user3@example.com', role: 'Administrador' },
        ];

        // Função para renderizar lista de usuários
        function renderUsers() {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';

            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td class="actions">
                        <button class="edit" data-id="${user.id}">Editar</button>
                        <button class="delete" data-id="${user.id}">Excluir</button>
                    </td>
                `;
                usersList.appendChild(tr);
            });
        }

         // Inicializar renderização de usuários
         renderUsers();

         // Evento para adicionar novo usuário
         document.getElementById('add-user').addEventListener('click', function() {
             const userName = document.getElementById('new-user-name').value.trim();
             const userEmail = document.getElementById('new-user-email').value.trim();
             const userRole = document.getElementById('new-user-role').value;
 
             if (userName && userEmail) {
                 users.push({ id: users.length + 1, name: userName, email: userEmail, role: userRole });
                 renderUsers();
                 document.getElementById('new-user-name').value = '';
                 document.getElementById('new-user-email').value = '';
                 document.getElementById('new-user-role').value = 'Jornalista';
             } else {
                 alert('Por favor, preencha todos os campos.');
             }
         });

          // Eventos de editar e excluir usuários
        document.getElementById('users-list').addEventListener('click', function(event) {
            if (event.target.classList.contains('edit')) {
                const id = event.target.getAttribute('data-id');
                const user = users.find(u => u.id === parseInt(id));
                const newName = prompt('Editar nome do usuário:', user.name);
                const newEmail = prompt('Editar email do usuário:', user.email);
                const newRole = prompt('Editar permissão do usuário (Jornalista, Editor, Administrador):', user.role);

                if (newName && newEmail && newRole) {
                    user.name = newName;
                    user.email = newEmail;
                    user.role = newRole;
                    renderUsers();
                }
            } else if (event.target.classList.contains('delete')) {
                const id = event.target.getAttribute('data-id');
                users = users.filter(u => u.id !== parseInt(id));
                renderUsers();
            }
        });

        console.log('JavaScript de gerenciamento de usuários carregado e funcionando');
    }

    // Verificar se estamos na página de Gerenciamento de Artigos
    if (window.location.pathname.endsWith('articles.html')) {
        // Simular dados de artigos
        const articles = [
            { id: 1, title: 'Artigo 1', author: 'Autor 1', status: 'Rascunho', date: '2024-07-30' },
            { id: 2, title: 'Artigo 2', author: 'Autor 2', status: 'Aguardando Aprovação', date: '2024-07-29' },
            { id: 3, title: 'Artigo 3', author: 'Autor 3', status: 'Publicado', date: '2024-07-28' },
        ];

        // Função para renderizar lista de artigos
        function renderArticles(filterStatus = 'all', searchQuery = '') {
            const articlesList = document.getElementById('articles-list');
            articlesList.innerHTML = '';

            const filteredArticles = articles.filter(article => {
                const statusMatch = filterStatus === 'all' || article.status.toLowerCase() === filterStatus.toLowerCase();
                const searchMatch = searchQuery === '' || article.title.toLowerCase().includes(searchQuery.toLowerCase());
                return statusMatch && searchMatch;
            });

            filteredArticles.forEach(article => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${article.title}</td>
                    <td>${article.author}</td>
                    <td>${article.status}</td>
                    <td>${article.date}</td>
                    <td class="actions">
                        <button class="edit">Editar</button>
                        <button class="delete">Excluir</button>
                        ${article.status === 'Rascunho' ? '<button class="review">Revisar</button>' : ''}
                        ${article.status === 'Aguardando Aprovação' ? '<button class="approve">Aprovar</button>' : ''}
                    </td>
                `;
                articlesList.appendChild(tr);
            });
        }

        // Inicializar renderização de artigos
        renderArticles();

        // Eventos de busca e filtragem
        document.getElementById('search').addEventListener('input', function() {
            const searchQuery = this.value;
            const filterStatus = document.getElementById('status-filter').value;
            renderArticles(filterStatus, searchQuery);
        });

        document.getElementById('status-filter').addEventListener('change', function() {
            const filterStatus = this.value;
            const searchQuery = document.getElementById('search').value;
            renderArticles(filterStatus, searchQuery);
        });

        // Evento de criar novo artigo
        document.getElementById('create-article').addEventListener('click', function() {
            alert('Funcionalidade de criação de artigo não implementada.');
        });
    }

    // Verificar se estamos na página de Gerenciamento de Categorias e Tags
    if (window.location.pathname.endsWith('categories.html')) {
        // Simular dados de categorias e tags
        let categories = [
            { id: 1, name: 'Categoria 1' },
            { id: 2, name: 'Categoria 2' },
            { id: 3, name: 'Categoria 3' },
        ];

        let tags = [
            { id: 1, name: 'Tag 1' },
            { id: 2, name: 'Tag 2' },
            { id: 3, name: 'Tag 3' },
        ];

        // Função para renderizar lista de categorias
        function renderCategories() {
            const categoriesList = document.getElementById('categories-list');
            categoriesList.innerHTML = '';

            categories.forEach(category => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${category.name}</td>
                    <td class="actions">
                        <button class="edit" data-id="${category.id}">Editar</button>
                        <button class="delete" data-id="${category.id}">Excluir</button>
                    </td>
                `;
                categoriesList.appendChild(tr);
            });
        }

        // Função para renderizar lista de tags
        function renderTags() {
            const tagsList = document.getElementById('tags-list');
            tagsList.innerHTML = '';

            tags.forEach(tag => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${tag.name}</td>
                    <td class="actions">
                        <button class="edit" data-id="${tag.id}">Editar</button>
                        <button class="delete" data-id="${tag.id}">Excluir</button>
                    </td>
                `;
                tagsList.appendChild(tr);
            });
        }

        // Inicializar renderização de categorias e tags
        renderCategories();
        renderTags();

        // Evento para adicionar nova categoria
        document.getElementById('add-category').addEventListener('click', function() {
            const newCategory = document.getElementById('new-category').value.trim();
            if (newCategory) {
                categories.push({ id: categories.length + 1, name: newCategory });
                renderCategories();
                document.getElementById('new-category').value = '';
            } else {
                alert('Por favor, insira um nome para a categoria.');
            }
        });

        // Evento para adicionar nova tag
        document.getElementById('add-tag').addEventListener('click', function() {
            const newTag = document.getElementById('new-tag').value.trim();
            if (newTag) {
                tags.push({ id: tags.length + 1, name: newTag });
                renderTags();
                document.getElementById('new-tag').value = '';
            } else {
                alert('Por favor, insira um nome para a tag.');
            }
        });

        // Eventos de editar e excluir categorias e tags
        document.getElementById('categories-list').addEventListener('click', function(event) {
            if (event.target.classList.contains('edit')) {
                const id = event.target.getAttribute('data-id');
                const category = categories.find(c => c.id === parseInt(id));
                const newName = prompt('Editar categoria:', category.name);
                if (newName) {
                    category.name = newName;
                    renderCategories();
                }
            } else if (event.target.classList.contains('delete')) {
                const id = event.target.getAttribute('data-id');
                categories = categories.filter(c => c.id !== parseInt(id));
                renderCategories();
            }
        });

        document.getElementById('tags-list').addEventListener('click', function(event) {
            if (event.target.classList.contains('edit')) {
                const id = event.target.getAttribute('data-id');
                const tag = tags.find(t => t.id === parseInt(id));
                const newName = prompt('Editar tag:', tag.name);
                if (newName) {
                    tag.name = newName;
                    renderTags();
                }
            } else if (event.target.classList.contains('delete')) {
                const id = event.target.getAttribute('data-id');
                tags = tags.filter(t => t.id !== parseInt(id));
                renderTags();
            }
        });

        console.log('JavaScript de gerenciamento de categorias e tags carregado e funcionando');
    }

    // Verificar se estamos na página de Configurações do Site
    if (window.location.pathname.endsWith('settings.html')) {
        // Simular dados de configurações
        let settings = {
            general: {
                siteName: 'Meu Site',
                siteLogo: 'logo.png',
                primaryColor: '#000000',
                secondaryColor: '#ffffff'
            },
            seo: {
                metaTitle: 'Título do Site',
                metaDescription: 'Descrição do Site'
            },
            social: {
                facebookUrl: 'https://facebook.com',
                instagramUrl: 'https://instagram.com'
            }
        };

        // Função para carregar configurações
        function loadSettings() {
            // Configurações Gerais
            document.getElementById('site-name').value = settings.general.siteName;
            document.getElementById('site-logo').value = settings.general.siteLogo;
            document.getElementById('primary-color').value = settings.general.primaryColor;
            document.getElementById('secondary-color').value = settings.general.secondaryColor;

            // Configurações de SEO
            document.getElementById('meta-title').value = settings.seo.metaTitle;
            document.getElementById('meta-description').value = settings.seo.metaDescription;

            // Configurações de Redes Sociais
            document.getElementById('facebook-url').value = settings.social.facebookUrl;
            document.getElementById('instagram-url').value = settings.social.instagramUrl;
        }

        // Função para salvar configurações gerais
        function saveGeneralSettings() {
            settings.general.siteName = document.getElementById('site-name').value;
            settings.general.siteLogo = document.getElementById('site-logo').value;
            settings.general.primaryColor = document.getElementById('primary-color').value;
            settings.general.secondaryColor = document.getElementById('secondary-color').value;
            alert('Configurações gerais salvas com sucesso!');
        }

        // Função para salvar configurações de SEO
        function saveSeoSettings() {
            settings.seo.metaTitle = document.getElementById('meta-title').value;
            settings.seo.metaDescription = document.getElementById('meta-description').value;
            alert('Configurações de SEO salvas com sucesso!');
        }

        // Função para salvar configurações de redes sociais
        function saveSocialSettings() {
            settings.social.facebookUrl = document.getElementById('facebook-url').value;
            settings.social.instagramUrl = document.getElementById('instagram-url').value;
            alert('Configurações de redes sociais salvas com sucesso!');
        }

        // Carregar configurações ao carregar a página
        loadSettings();

        // Eventos de salvamento
        document.getElementById('save-general-settings').addEventListener('click', saveGeneralSettings);
        document.getElementById('save-seo-settings').addEventListener('click', saveSeoSettings);
        document.getElementById('save-social-settings').addEventListener('click', saveSocialSettings);

        console.log('JavaScript de configurações do site carregado e funcionando');
    }

    // Simular obtenção de dados de estatísticas do site
    const stats = {
        articles: 150,
        visitors: 10000,
        comments: 500
    };

    document.getElementById('num-articles').textContent = stats.articles;
    document.getElementById('num-visitors').textContent = stats.visitors;
    document.getElementById('num-comments').textContent = stats.comments;

    console.log('JavaScript de administração carregado e funcionando');
});
