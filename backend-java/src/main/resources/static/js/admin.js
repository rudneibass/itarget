const 
admin = {
  baseUrl: 'http://localhost:8080/admin',
  endpoints:{
    publicacoes: {
      get: '/publicacoes/id',
      list: '/publicacoes/listar'
    }
  },
  navigate: ({ url, containerId, id = null }) => {
    fetch(url)
    .then(response => response.text())
    .then(html => {
        const container = document.getElementById(containerId);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const scripts = tempDiv.querySelectorAll('script');
        container.innerHTML = '';
        container.append(...tempDiv.childNodes);
          
        if (id !== null) {
          const inputId = container.querySelector('input#id');
          if (inputId) {
            inputId.value = id;
          }
        }

        scripts.forEach(script => {
          const newScript = document.createElement('script');
          if (script.type) newScript.type = script.type;
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          document.body.appendChild(newScript);
        });
      }
    );
  },

  addTab: ({ tabId, title, url, id = null}) => {
    const tabElementId = `tab-${tabId}`;
    const contentId = tabElementId + '-content';

    if (document.getElementById(contentId)) {
      $('.main-nav-link').removeClass('active');
      $('.main-tab-pane').removeClass('active');
      $(`#tabs a[href="#${contentId}"]`).addClass('active');
      $(`#${contentId}`).addClass('active');
      return;
    }

    // Criar aba
    const newTab = $(`
      <li class="nav-item main-nav-item">
        <a class="nav-link main-nav-link" data-toggle="tab" href="#${contentId}">
          ${title}
          <span style="cursor: pointer; margin-left: 8px; font-size: 15px" onclick="admin.closeTab('${tabId}')">&times;</span>
        </a>
      </li>
    `);

    // Criar conteúdo
    const newContent = $(`
      <div class="tab-pane main-tab-pane p-2" id="${contentId}">
        <div class="tab-container" id="${tabElementId}-container">
          Carregando...
        </div>
      </div>
    `);

    // Remover active de outras abas
    $('#tabs .nav-link').removeClass('active');
    $('#tab-content .tab-pane').removeClass('active');

    // Adicionar nova aba e conteúdo
    $('#tabs').append(newTab);
    $('#tab-content').append(newContent);

    // Ativar nova aba
    newTab.find('a').addClass('active');
    newContent.addClass('active');

    // Carregar conteúdo via fetch
    admin.navigate({
      url: url,
      containerId: `${tabElementId}-container`,
      id: id
    });

  },
  closeTab: (id) => {
    const tabId = `tab-${id}`;
    const contentId = tabId + '-content';

    const $tab = $(`#tabs a[href="#${contentId}"]`);
    const $li = $tab.closest('li');

    const isActive = $tab.hasClass('active');

    // Captura a aba anterior e a próxima, se existirem
    const $prev = $li.prev('li').find('a.nav-link');
    const $next = $li.next('li').find('a.nav-link');

    $li.remove();
    $(`#${contentId}`).remove();

    // Se era ativa, ativa a anterior ou próxima
    if (isActive) {
      const $newActive = $prev.length ? $prev : $next;
      if ($newActive.length) {
        $newActive.addClass('active');
        $($newActive.attr('href')).addClass('active');
      }
    }
  },
  validateInputs: (formId) => {
    const $form = $('#'+formId);
    $form.find('input, select, textarea').on('blur', function () {
      const $input = $(this);
      if (this.checkValidity()) {
        $input.removeClass('is-invalid').addClass('is-valid');
      } else {
        $input.removeClass('is-valid').addClass('is-invalid');
      }
    });
  },
  validateForm: (formId) => {
    const $form = $('#'+formId);
    let validForm = true;
    $form.find('input[required], select[required], textarea[required]').each(function () {
      const $input = $(this);
      if (!this.checkValidity()) {
        $input.addClass('is-invalid').removeClass('is-valid');
        validForm = false;
      } else {
        $input.removeClass('is-invalid').addClass('is-valid');
      }
    });

    return validForm;
  }
};