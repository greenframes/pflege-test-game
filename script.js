
    // Game State
    let currentScenario = 0;
    let score = 0;
    
    // Default Config
    const defaultConfig = {
      game_title: 'Pflege-Entscheidungsspiel',
      welcome_text: 'Erlebe den Alltag in der Pflege und triff wichtige Entscheidungen',
      background_color: '#f39ca5',
      primary_color: '#f39ca5',
      accent_color: '#059669',
      card_color: '#ffffff',
      text_color: '#0f172a',
      font_family: 'Nunito'
    };
    
    // Scenarios Data
    const scenarios = [
      {
        icon: '👴',
        title: 'Der vergessliche Herr Müller',
        text: 'Herr Müller (82) mit Demenz fragt dich zum fünften Mal heute, wann sein Sohn kommt. Er wirkt unruhig und ängstlich.',
        options: [
          { text: 'Geduldig erklären und ihn beruhigen, eventuell ablenken', correct: true },
          { text: 'Ihm sagen, dass er das schon oft gefragt hat', correct: false },
          { text: 'Einfach weitergehen, er vergisst es eh wieder', correct: false }
        ],
        feedback: {
          correct: 'Perfekt! Empathie und Geduld sind bei Demenz essentiell.',
          wrong: 'Bei Demenz hilft Geduld und Validation – die Gefühle ernst nehmen ist wichtiger als Fakten zu korrigieren.'
        },
        tip: 'Validation-Methode: Gefühle bestätigen statt korrigieren. Das gibt Sicherheit und reduziert Angst.'
      },
      {
        icon: '💊',
        title: 'Medikamenten-Verwechslung',
        text: 'Beim Medikamente-Stellen fällt dir auf, dass Frau Schmidt andere Tabletten bekommen soll als im Plan steht. Eine Kollegin hat es vorbereitet.',
        options: [
          { text: 'Zuerst mit der Kollegin und Pflegeleitung klären', correct: true },
          { text: 'Einfach die richtigen Medikamente geben', correct: false },
          { text: 'Die vorbereiteten Medikamente trotzdem geben', correct: false }
        ],
        feedback: {
          correct: 'Richtig! Das 4-Augen-Prinzip und Kommunikation schützt vor Fehlern.',
          wrong: 'Medikamentenfehler können gefährlich sein. Immer klären und dokumentieren!'
        },
        tip: 'Das 6-R-Prinzip: Richtige Person, Medikament, Dosis, Zeit, Art und Dokumentation.'
      },
      {
        icon: '🚿',
        title: 'Körperpflege verweigert',
        text: 'Frau Weber (75) weigert sich seit 3 Tagen zu duschen. Sie sagt, sie fühlt sich unwohl und hat Angst vor dem Wasser.',
        options: [
          { text: 'Alternativen anbieten und nach den Gründen fragen', correct: true },
          { text: 'Die Pflege trotzdem durchführen, Hygiene ist wichtig', correct: false },
          { text: 'Sie in Ruhe lassen, sie wird sich schon melden', correct: false }
        ],
        feedback: {
          correct: 'Super! Selbstbestimmung respektieren und kreative Lösungen finden.',
          wrong: 'Zwang verletzt die Würde. Alternativen wie Waschungen am Bett können helfen.'
        },
        tip: 'Biografiearbeit hilft: Vielleicht hat Frau Weber frühe Erfahrungen, die ihre Angst erklären.'
      },
      {
        icon: '🍽️',
        title: 'Essen verweigern',
        text: 'Herr Klein nimmt seit Tagen kaum Nahrung zu sich. Er sagt, das Essen schmecke ihm nicht und er habe keinen Appetit.',
        options: [
          { text: 'Ernährungszustand dokumentieren und mit Arzt/Team besprechen', correct: true },
          { text: 'Ihm sein Lieblingsessen von zu Hause mitbringen lassen', correct: false },
          { text: 'Ihn zum Essen überreden, er muss ja Kraft haben', correct: false }
        ],
        feedback: {
          correct: 'Richtig! Professionelle Einschätzung ist wichtig bei Ernährungsproblemen.',
          wrong: 'Appetitlosigkeit kann viele Ursachen haben. Ärztliche Abklärung ist wichtig!'
        },
        tip: 'Ein Ernährungsprotokoll hilft, das Problem zu erfassen und dem Arzt zu vermitteln.'
      },
      {
        icon: '😢',
        title: 'Traurige Bewohnerin',
        text: 'Frau Hoffmann sitzt weinend in ihrem Zimmer. Ihr Mann ist vor einem Monat verstorben. Sie sagt, sie will nicht mehr leben.',
        options: [
          { text: 'Zuhören, ernst nehmen und professionelle Hilfe einschalten', correct: true },
          { text: 'Sie aufmuntern und ablenken', correct: false },
          { text: 'Ihr sagen, dass die Zeit alle Wunden heilt', correct: false }
        ],
        feedback: {
          correct: 'Sehr gut! Suizidäußerungen immer ernst nehmen und Hilfe holen.',
          wrong: 'Solche Äußerungen nie bagatellisieren! Immer ernst nehmen und melden.'
        },
        tip: 'Frag direkt nach: „Denken Sie daran, sich etwas anzutun?" Offenheit schafft Vertrauen.'
      },
      {
        icon: '🩹',
        title: 'Sturz im Flur',
        text: 'Du findest Herrn Braun auf dem Boden im Flur. Er sagt, er sei gestürzt, scheint aber unverletzt. Er möchte einfach aufstehen.',
        options: [
          { text: 'Vitalzeichen prüfen, Arzt informieren und Sturz dokumentieren', correct: true },
          { text: 'Ihm schnell aufhelfen und ins Bett bringen', correct: false },
          { text: 'Ihn fragen, ob alles okay ist und weitergehen', correct: false }
        ],
        feedback: {
          correct: 'Perfekt! Ein Sturzprotokoll ist Pflicht, auch bei scheinbar harmlosen Stürzen.',
          wrong: 'Stürze können verzögerte Folgen haben. Dokumentation und Untersuchung sind essentiell!'
        },
        tip: 'Nach Stürzen auf Kopfverletzungen achten – Symptome können zeitverzögert auftreten.'
      },
      {
        icon: '👨‍👩‍👧',
        title: 'Angehörige beschweren sich',
        text: 'Die Tochter von Frau Lehmann beschwert sich lautstark, dass ihre Mutter ungepflegt aussehe und zu wenig trinke.',
        options: [
          { text: 'Ruhig bleiben, zuhören und gemeinsam Lösungen suchen', correct: true },
          { text: 'Die Vorwürfe zurückweisen und Personalnotstand erklären', correct: false },
          { text: 'Die Pflegedienstleitung holen und das Gespräch abgeben', correct: false }
        ],
        feedback: {
          correct: 'Richtig! Angehörigenarbeit ist wichtig. Sorgen ernst nehmen schafft Vertrauen.',
          wrong: 'Beschwerden sind oft Ausdruck von Sorge. Empathie öffnet Türen für Lösungen.'
        },
        tip: 'Angehörige sind wichtige Partner. Regelmäßige Info-Gespräche beugen Konflikten vor.'
      },
      {
        icon: '🌙',
        title: 'Nachtschicht-Notfall',
        text: 'Um 3 Uhr nachts klingelt Herr Peters. Er hat starke Brustschmerzen und Atemnot. Du bist allein auf der Station.',
        options: [
          { text: 'Notruf absetzen, Vitalzeichen prüfen, bei ihm bleiben', correct: true },
          { text: 'Erstmal abwarten, ob es besser wird, und ihn beruhigen', correct: false },
          { text: 'Die diensthabende Pflegekraft von der anderen Station rufen', correct: false }
        ],
        feedback: {
          correct: 'Lebensrettend! Bei Herzinfarkt-Verdacht zählt jede Minute.',
          wrong: 'Brustschmerzen mit Atemnot sind immer ein Notfall! Sofort 112 rufen.'
        },
        tip: 'ABCDE-Schema: Airway, Breathing, Circulation, Disability, Exposure – systematisch vorgehen.'
      }
    ];
    
    // Initialize SDK
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
          const titleEl = document.getElementById('title-display');
          const welcomeEl = document.getElementById('welcome-display');
          
          if (titleEl) {
            titleEl.textContent = config.game_title || defaultConfig.game_title;
            titleEl.style.color = config.primary_color || defaultConfig.primary_color;
          }
          if (welcomeEl) {
            welcomeEl.textContent = config.welcome_text || defaultConfig.welcome_text;
          }
          
          document.querySelectorAll('[style*="color: #0369a1"]').forEach(el => {
            el.style.color = config.primary_color || defaultConfig.primary_color;
          });
          
          document.querySelectorAll('[style*="color: #059669"]').forEach(el => {
            el.style.color = config.accent_color || defaultConfig.accent_color;
          });
          
          const appFont = config.font_family || defaultConfig.font_family;
          document.body.style.fontFamily = `${appFont}, sans-serif`;
        },
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }
            },
            {
              get: () => config.card_color || defaultConfig.card_color,
              set: (v) => { config.card_color = v; window.elementSdk.setConfig({ card_color: v }); }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }
            },
            {
              get: () => config.primary_color || defaultConfig.primary_color,
              set: (v) => { config.primary_color = v; window.elementSdk.setConfig({ primary_color: v }); }
            },
            {
              get: () => config.accent_color || defaultConfig.accent_color,
              set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); }
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
          },
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
          ['game_title', config.game_title || defaultConfig.game_title],
          ['welcome_text', config.welcome_text || defaultConfig.welcome_text]
        ])
      });
    }
    
    function startGame() {
      currentScenario = 0;
      score = 0;
      document.getElementById('start-screen').classList.add('hidden');
      document.getElementById('game-screen').classList.remove('hidden');
      showScenario();
    }
    
    function showScenario() {
      const scenario = scenarios[currentScenario];
      
      document.getElementById('scenario-counter').textContent = `Szenario ${currentScenario + 1} von 8`;
      document.getElementById('score-display').textContent = `✓ ${score} Punkte`;
      document.getElementById('progress-bar').style.width = `${(currentScenario / 8) * 100}%`;
      
      document.getElementById('scenario-icon').textContent = scenario.icon;
      document.getElementById('scenario-title').textContent = scenario.title;
      document.getElementById('scenario-text').textContent = scenario.text;
      
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = '';
      
      const shuffledOptions = [...scenario.options].sort(() => Math.random() - 0.5);
      
      shuffledOptions.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn w-full p-4 rounded-xl text-left font-semibold border-2 animate-slide';
        btn.style.cssText = 'background: #f8fafc; border-color: #e2e8f0; color: #334155; animation-delay: ' + (index * 0.1) + 's;';
        btn.innerHTML = `<span class="mr-2">${['A', 'B', 'C'][index]}.</span> ${option.text}`;
        btn.onclick = () => selectOption(option.correct, option.text);
        optionsContainer.appendChild(btn);
      });
      
      // Re-trigger animation
      const card = document.getElementById('scenario-card');
      card.classList.remove('animate-fade');
      void card.offsetWidth;
      card.classList.add('animate-fade');
    }
    
    function selectOption(isCorrect, optionText) {
      const scenario = scenarios[currentScenario];
      
      if (isCorrect) {
        score++;
      }
      
      document.getElementById('game-screen').classList.add('hidden');
      document.getElementById('feedback-screen').classList.remove('hidden');
      
      const feedbackIcon = document.getElementById('feedback-icon');
      const feedbackTitle = document.getElementById('feedback-title');
      const feedbackText = document.getElementById('feedback-text');
      const feedbackCard = document.getElementById('feedback-card');
      
      if (isCorrect) {
        feedbackIcon.textContent = '✅';
        feedbackTitle.textContent = 'Richtige Entscheidung!';
        feedbackTitle.style.color = '#059669';
        feedbackText.textContent = scenario.feedback.correct;
      } else {
        feedbackIcon.textContent = '💡';
        feedbackTitle.textContent = 'Das war nicht optimal';
        feedbackTitle.style.color = '#dc2626';
        feedbackText.textContent = scenario.feedback.wrong;
      }
      
      document.getElementById('tip-text').textContent = scenario.tip;
      
      feedbackCard.classList.remove('animate-fade');
      void feedbackCard.offsetWidth;
      feedbackCard.classList.add('animate-fade');
    }
    
    function nextScenario() {
      currentScenario++;
      
      if (currentScenario >= scenarios.length) {
        showResults();
      } else {
        document.getElementById('feedback-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        showScenario();
      }
    }
    
    function showResults() {
      document.getElementById('feedback-screen').classList.add('hidden');
      document.getElementById('result-screen').classList.remove('hidden');
      
      const resultIcon = document.getElementById('result-icon');
      const resultTitle = document.getElementById('result-title');
      const resultSubtitle = document.getElementById('result-subtitle');
      const resultMessage = document.getElementById('result-message').querySelector('p');
      
      document.getElementById('final-score').textContent = score;
      
      if (score === 8) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Perfekt!';
        resultSubtitle.textContent = 'Du bist ein Pflege-Profi!';
        resultMessage.textContent = 'Fantastisch! Du hast alle Situationen souverän gemeistert. Der Pflegeberuf könnte genau das Richtige für dich sein!';
      } else if (score >= 6) {
        resultIcon.textContent = '🌟';
        resultTitle.textContent = 'Sehr gut!';
        resultSubtitle.textContent = 'Du hast großes Potenzial';
        resultMessage.textContent = 'Starke Leistung! Du zeigst viel Empathie und gutes Urteilsvermögen. Mit etwas Übung wirst du eine tolle Pflegekraft.';
      } else if (score >= 4) {
        resultIcon.textContent = '👍';
        resultTitle.textContent = 'Gut gemacht!';
        resultSubtitle.textContent = 'Du bist auf dem richtigen Weg';
        resultMessage.textContent = 'Guter Ansatz! Die Pflege ist ein Lernprozess. Interesse und Empathie sind die wichtigsten Grundlagen – beides hast du!';
      } else {
        resultIcon.textContent = '📚';
        resultTitle.textContent = 'Weitermachen!';
        resultSubtitle.textContent = 'Übung macht den Meister';
        resultMessage.textContent = 'Keine Sorge! Die Pflege hat viele Facetten. Spiel nochmal und lerne die Tipps – du wirst sehen, wie schnell du besser wirst!';
      }
    }
    
    function restartGame() {
      document.getElementById('result-screen').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      currentScenario = 0;
      score = 0;
    }
