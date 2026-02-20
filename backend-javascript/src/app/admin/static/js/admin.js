const 
admin = {
  baseUrl: 'http://localhost:3000/admin',
  navigate: ({ url, containerId, id = null, data = null }) => {
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

        if (data !== null) {
          $.each(data, function (field, value) {
            const inputData = container.querySelector('input#'+field);
            if (inputData){
                inputData.value = value;
            }
          })
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
      const existingTabEl = document.querySelector(`#tabs a[href="#${contentId}"]`);
      if (existingTabEl) {
        const existingTab = bootstrap.Tab.getOrCreateInstance(existingTabEl);
        existingTab.show();
      }
      return;
    }

    // Criar aba
    const newTab = $(`
      <li class="nav-item main-nav-item">
        <a class="nav-link main-nav-link" data-bs-toggle="tab" href="#${contentId}">
          ${title}
          <span style="cursor: pointer; margin-left: 8px; font-size: 15px" onclick="admin.closeTab('${tabId}')">&times;</span>
        </a>
      </li>
    `);

    // Criar conteúdo
    const newContent = $(`
      <div class="tab-pane main-tab-pane px-0" id="${contentId}">
        <div class="tab-container" id="${tabElementId}-container">
          Carregando...
        </div>
      </div>
    `);

    // Remover estados de outras abas
    $('#tabs .nav-link').removeClass('active').attr('aria-selected', 'false');
    $('#tab-content .tab-pane').removeClass('active show');

    // Adicionar nova aba e conteúdo
    $('#tabs').append(newTab);
    $('#tab-content').append(newContent);

    // Ativar nova aba
    const newTabLink = newTab.find('a').get(0);
    const tabInstance = bootstrap.Tab.getOrCreateInstance(newTabLink);
    tabInstance.show();

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
        const tabInstance = bootstrap.Tab.getOrCreateInstance($newActive.get(0));
        tabInstance.show();
      }
    }
  },
  showModal: ({modalId, title, url, data}) => {
    const $modal = $(`#${modalId}`);

    if ($modal.length) {
      $modal.find('#defaultModalTitle').empty();
      $modal.find('#defaultModalTitle').text(title);
      const modalElement = $modal.get(0);
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    } 
    admin.navigate({
      url: url,
      containerId:`defaultModalBody`,
      id: null,
      data: data
    });
  },
  hideModal: ({ modalId }) => {
    const $modal = $(`#${modalId}`);
    if ($modal.length) { 
      const modalElement = $modal.get(0);
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.hide();
    }
  },
  loading: (active = true) => {
    const main = document.querySelector('main');

    if (!main) {
      return;
    }

    const styleId = 'admin-main-loading-style';
    let style = document.getElementById(styleId);

    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        main.admin-main-loading {
          position: relative;
        }

        main.admin-main-loading > *:not(#admin-main-loading-overlay) {
          opacity: .35;
          pointer-events: none;
          user-select: none;
        }

        #admin-main-loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          pointer-events: all;
        }

        #admin-main-loading-overlay .admin-main-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(0, 0, 0, .15);
          border-top-color: rgba(0, 0, 0, .65);
          border-radius: 50%;
          animation: admin-main-spin .7s linear infinite;
        }

        @keyframes admin-main-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `;
      document.head.appendChild(style);
    }

    const overlayId = 'admin-main-loading-overlay';
    const currentOverlay = document.getElementById(overlayId);

    if (!active) {
      if (currentOverlay) {
        currentOverlay.remove();
      }
      main.classList.remove('admin-main-loading');
      return;
    }

    if (currentOverlay) {
      return;
    }

    const overlay = document.createElement('div');
    overlay.id = overlayId;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="admin-main-spinner"></div>';

    main.classList.add('admin-main-loading');
    main.appendChild(overlay);
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
  },
  tooltipInit: () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  },
  tinymceTriggerSave: () =>{
    //tinymce.get('.tinymce').save();
    tinymce.triggerSave(); 
  },
  tinymceInit: () => { 
        tinymce.remove('.tinymce');
        tinymce.init({
        selector: "textarea.tinymce",
        plugins: "code print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        menubar: "file edit view insert format tools table tc help",
        toolbar: "code | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
        autosave_ask_before_unload: true,
        extended_valid_elements: "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        image_advtab: true,
        link_list: [{
                title: "My page 1",
                value: "https://www.tiny.cloud"
            },
            {
                title: "My page 2",
                value: "http://www.moxiecode.com"
            },
        ],
        image_list: [{
                title: "My page 1",
                value: "https://www.tiny.cloud"
            },
            {
                title: "My page 2",
                value: "http://www.moxiecode.com"
            },
        ],
        image_class_list: [{
                title: "None",
                value: ""
            },
            {
                title: "Some class",
                value: "class-name"
            },
        ],
        importcss_append: true,
        templates: [{
                title: "New Table",
                description: "creates a new table",
                content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
                title: "Starting my story",
                description: "A cure for writers block",
                content: "Once upon a time...",
            },
            {
                title: "New list with dates",
                description: "New List with dates",
                content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        spellchecker_ignore_list: ["Ephox", "Moxiecode"],
        tinycomments_mode: "embedded",
        content_style: "body img.md\\:float-right{ float: right; }; @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Slab&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'); body { font-family: Roboto; };",
        contextmenu: "link image in",
        a11y_advanced_options: true,
        mentions_selector: ".mymention",
        mentions_item_type: "profile",
        font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Roboto=roboto; Roboto Slab=roboto slab; Symbol=symbol; Serif=sans-serif; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
        fontsize_formats: "8pt 10pt 10.5pt 12pt 14pt 16pt 18pt 20pt 21pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt 38pt 40pt",
        textpattern_patterns: [{
                start: "#",
                format: "h1"
            },
            {
                start: "##",
                format: "h2"
            },
            {
                start: "###",
                format: "h3"
            },
            {
                start: "####",
                format: "h4"
            },
            {
                start: "#####",
                format: "h5"
            },
            {
                start: "######",
                format: "h6"
            },
            {
                start: "* ",
                cmd: "InsertUnorderedList"
            },
            {
                start: "- ",
                cmd: "InsertUnorderedList"
            },
            {
                start: "1. ",
                cmd: "InsertOrderedList",
                value: {
                    "list-style-type": "decimal"
                },
            },
            {
                start: "1) ",
                cmd: "InsertOrderedList",
                value: {
                    "list-style-type": "decimal"
                },
            },
            {
                start: "a. ",
                cmd: "InsertOrderedList",
                value: {
                    "list-style-type": "lower-alpha"
                },
            },
            {
                start: "a) ",
                cmd: "InsertOrderedList",
                value: {
                    "list-style-type": "lower-alpha"
                },
            },
            {
                start: "i. ",
                cmd: "InsertOrderedList",
                value: {
                    "list-style-type": "lower-roman"
                },
            },
            {
                start: "i) ",
                cmd: "InsertOrderedList",
                value: {
                    "list-style-type": "lower-roman"
                },
            },
            {
                start: "---",
                replacement: "<hr/>"
            },
            {
                start: "--",
                replacement: "—"
            },
            {
                start: "-",
                replacement: "—"
            },
            {
                start: "(c)",
                replacement: "©"
            },
            {
                start: "//brb",
                replacement: "Be Right Back"
            },
            {
                start: "//heading",
                replacement: '<h1 style="color: blue">Heading here</h1> <h2>Author: Name here</h2> <p><em>Date: 01/01/2000</em></p> <hr />',
            },
            {
                start: "*",
                end: "*",
                format: "italic"
            },
            {
                start: "**",
                end: "**",
                format: "bold"
            },
        ],
        /*image_class_list: [
                  {title: 'Responsive', value: 'img-responsive'}
              ],*/
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        setup: function (editor) {
                editor.on('change', function () {
                editor.save(); // <-- Atualiza o conteúdo do <textarea>
            });
        }
    });
  }
};