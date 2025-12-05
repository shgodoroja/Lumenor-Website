// Lumenor site JS

function byId(id){ return document.getElementById(id); }

function track(event, data){
  // placeholder for analytics hook
  // console.log('track', event, data)
}

function ensureSmartBannerMeta(){
  if(document.querySelector('meta[name="apple-itunes-app"]')) return;
  const meta = document.createElement('meta');
  meta.name = 'apple-itunes-app';
  meta.content = 'app-id=6754094107';
  document.head.appendChild(meta);
}

const LANG_OPTIONS = [
  { code: 'en', label: 'English', path: '/' },
  { code: 'en-GB', label: 'English (UK)', path: '/en-GB/' },
  { code: 'en-AU', label: 'English (AU)', path: '/en-AU/' },
  { code: 'da', label: 'Dansk', path: '/da/' },
  { code: 'de-DE', label: 'Deutsch', path: '/de-DE/' },
  { code: 'fr-FR', label: 'Français (FR)', path: '/fr-FR/' },
  { code: 'fr-CA', label: 'Français (CA)', path: '/fr-CA/' },
  { code: 'nl-NL', label: 'Nederlands', path: '/nl-NL/' },
  { code: 'ja', label: '日本語', path: '/ja/' },
  { code: 'ko', label: '한국어', path: '/ko/' },
  { code: 'nb', label: 'Norsk', path: '/nb/' },
  { code: 'sv', label: 'Svenska', path: '/sv/' }
];

const LANG_SLUG_MAP = {
  'en': '/',
  'en-GB': '/en-GB/',
  'en-AU': '/en-AU/',
  'da': '/da/',
  'de': '/de-DE/',
  'de-DE': '/de-DE/',
  'fr': '/fr-FR/',
  'fr-FR': '/fr-FR/',
  'fr-CA': '/fr-CA/',
  'nl': '/nl-NL/',
  'nl-NL': '/nl-NL/',
  'ja': '/ja/',
  'ko': '/ko/',
  'nb': '/nb/',
  'sv': '/sv/'
};

function deriveBaseFromPath(pathname){
  const match = pathname.match(/^\/([a-zA-Z-]+)\//);
  if(match && LANG_SLUG_MAP[match[1]]) return LANG_SLUG_MAP[match[1]];
  return '/';
}

function initLanguageSwitcher(){
  const nav = document.querySelector('header nav');
  if(!nav || document.getElementById('lang-select')) return;
  const currentPath = window.location.pathname;
  const isSupport = currentPath.includes('support');
  const currentLang = document.documentElement.lang || 'en';
  const currentBase = LANG_SLUG_MAP[currentLang] || deriveBaseFromPath(currentPath);

  const select = document.createElement('select');
  select.id = 'lang-select';
  select.className = 'lang-select';
  select.setAttribute('aria-label', 'Change language');

  LANG_OPTIONS.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.path;
    option.textContent = opt.label;
    select.appendChild(option);
  });
  select.value = currentBase;

  select.addEventListener('change', function(e){
    const base = e.target.value || '/';
    const suffix = isSupport ? 'support.html' : '';
    const dest = base === '/' ? `/${suffix}` : `${base}${suffix}`;
    window.location.href = suffix ? dest : base;
  });

  const wrap = document.createElement('div');
  wrap.className = 'lang-switcher';
  wrap.appendChild(select);
  nav.appendChild(wrap);
}

function ensureFooterLinks(){
  const footerNav = document.querySelector('footer .row > div:last-child');
  if(!footerNav) return;
  const hasPrivacy = footerNav.innerHTML.includes('privacy.html');
  if(!hasPrivacy){
    const dot = document.createElement('span');
    dot.style.opacity = '.5';
    dot.style.padding = '0 6px';
    dot.textContent = '•';
    const privacy = document.createElement('a');
    privacy.href = '/privacy.html';
    privacy.textContent = 'Privacy';
    footerNav.appendChild(dot);
    footerNav.appendChild(privacy);
  }
}

function initSupportForm(){
  const form = byId('support-form');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = byId('name').value.trim();
    const email = byId('email').value.trim();
    const message = byId('message').value.trim();
    if(!email || !message){
      alert('Please provide your email and a brief message.');
      return;
    }
    const to = (form.dataset.to || 'lumenorapp@babaheights.com'); // set data-to="support@yourdomain"
    const subject = encodeURIComponent('Lumenor Support Request');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const href = `mailto:${to}?subject=${subject}&body=${body}`;
    track('support_submit', { email });
    window.location.href = href;
  });
}

document.addEventListener('DOMContentLoaded', function(){
  ensureSmartBannerMeta();
  initLanguageSwitcher();
  ensureFooterLinks();
  initSupportForm();
  tryApplyI18n();
});

function tryApplyI18n(){
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if(!lang) return;
  const t = I18N[lang];
  if(!t) return;
  // Home page keys
  setText('nav_features', t.nav_features);
  setText('nav_support', t.nav_support);
  setText('kicker', t.kicker);
  setText('hero_title', t.hero_title);
  setText('hero_sub', t.hero_sub);

  // Feature grid
  setText('feat1_title', t.feat1_title);
  setText('feat1_desc', t.feat1_desc);
  setText('feat2_title', t.feat2_title);
  setText('feat2_desc', t.feat2_desc);
  setText('feat3_title', t.feat3_title);
  setText('feat3_desc', t.feat3_desc);
  setText('feat4_title', t.feat4_title);
  setText('feat4_desc', t.feat4_desc);
  setText('feat5_title', t.feat5_title);
  setText('feat5_desc', t.feat5_desc);
  setText('feat6_title', t.feat6_title);
  setText('feat6_desc', t.feat6_desc);

  // Support page keys
  setText('support_title', t.support_title);
  setText('support_sub', t.support_sub);
  setText('label_name', t.label_name);
  setText('label_email', t.label_email);
  setText('help_email', t.help_email);
  setText('label_message', t.label_message);
  setText('btn_send', t.btn_send);
  if(document.getElementById('email_note') && t.email_note){
    document.getElementById('email_note').innerHTML = t.email_note;
  }
}

function setText(id, val){ if(!val) return; const el = document.getElementById(id); if(el) el.textContent = val; }

const I18N = {
  'en-GB': {
    nav_features:'Features', nav_support:'Support',
    kicker:'Habit tracker for Mac', hero_title:"Build habits you’ll want to protect", hero_sub:'Lumenor makes progress obvious with calm, high‑contrast grids, a motivating Streak Counter Bar, and one‑click Today check‑ins. Stay on track with gentle reminders and a clear month view.',
    support_title:"We’re here to help", support_sub:'Send us a note and we’ll reply by email. Include details like macOS version and steps to reproduce if you’re reporting an issue.', label_name:'Name', label_email:'Email *', help_email:'We’ll reply to this address.', label_message:'Message *', btn_send:'Send message', email_note:'Or email us directly: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Two grids, one goal', feat1_desc:'Switch between a compact Numeric grid and a date‑aligned Calendar grid — both optimized for dark mode and readability.',
    feat2_title:'Streak Counter Bar', feat2_desc:'See current and best streaks at a glance. Momentum matters — protect your run with one‑click check‑ins.',
    feat3_title:'Gentle reminders', feat3_desc:'Create per‑habit daily reminders at the time that works for you. Lumenor nudges; you stay in control.',
    feat4_title:'One‑click Today', feat4_desc:'Check in with a single click and a sensible grace window. No clutter — just the next right action.',
    feat5_title:'Stats & trends', feat5_desc:'Compare the last 30 days, see freeze counts, and export snapshots to share progress.',
    feat6_title:'Themes & custom looks', feat6_desc:'Pick calming themes, custom colors, wallpapers, and tile shapes that fit your focus.'
  },
  'en-AU': {
    nav_features:'Features', nav_support:'Support',
    kicker:'Habit tracker for Mac', hero_title:'Build habits you’ll want to protect', hero_sub:'Lumenor makes progress obvious with calm, high‑contrast grids, a motivating Streak Counter Bar, and one‑click Today check‑ins. Stay on track with gentle reminders and a clear month view.',
    support_title:"We’re here to help", support_sub:'Send us a note and we’ll reply by email. Include details like macOS version and steps to reproduce if you’re reporting an issue.', label_name:'Name', label_email:'Email *', help_email:'We’ll reply to this address.', label_message:'Message *', btn_send:'Send message', email_note:'Or email us directly: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Two grids, one goal', feat1_desc:'Switch between a compact Numeric grid and a date‑aligned Calendar grid — both optimised for dark mode and readability.',
    feat2_title:'Streak Counter Bar', feat2_desc:'See current and best streaks at a glance. Momentum matters — protect your run with one‑click check‑ins.',
    feat3_title:'Gentle reminders', feat3_desc:'Create per‑habit daily reminders at the time that works for you. Lumenor nudges; you stay in control.',
    feat4_title:'One‑click Today', feat4_desc:'Check in with a single click and a sensible grace window. No clutter — just the next right action.',
    feat5_title:'Stats & trends', feat5_desc:'Compare the last 30 days, see freeze counts, and export snapshots to share progress.',
    feat6_title:'Themes & custom looks', feat6_desc:'Pick calming themes, custom colours, wallpapers, and tile shapes that fit your focus.'
  },
  'da': {
    nav_features:'Funktioner', nav_support:'Support',
    kicker:'Vanesporing til Mac', hero_title:'Byg vaner, du vil beskytte', hero_sub:'Lumenor gør fremskridt tydelige med rolige, høj‑kontrast gittere, en motiverende streak‑linje og ét‑klik tjek‑ind for I dag.',
    support_title:'Vi er her for at hjælpe', support_sub:'Send os en besked, så svarer vi pr. e‑mail. Tilføj macOS‑version og trin ved fejl.', label_name:'Navn', label_email:'E‑mail *', help_email:'Vi svarer til denne adresse.', label_message:'Besked *', btn_send:'Send besked', email_note:'Eller skriv direkte: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'To gittere, ét mål', feat1_desc:'Skift mellem et kompakt numerisk gitter og et kalendergitter — begge optimeret til mørk tilstand og læsbarhed.',
    feat2_title:'Streak‑linje', feat2_desc:'Se aktuel og bedste streak med det samme. Momentum betyder noget — beskyt din serie med ét klik.',
    feat3_title:'Blide påmindelser', feat3_desc:'Opret daglige påmindelser pr. vane på det tidspunkt, der passer dig.',
    feat4_title:'Ét‑klik I dag', feat4_desc:'Tjek ind med et enkelt klik og en fornuftig frist. Ingen støj — kun næste handling.',
    feat5_title:'Statistik & tendenser', feat5_desc:'Sammenlign de sidste 30 dage, se frost‑antal og eksportér øjebliksbilleder.',
    feat6_title:'Temaer og tilpasning', feat6_desc:'Vælg rolige temaer, egne farver, baggrunde og fliseformer, der passer til dit fokus.'
  },
  'de-DE': {
    nav_features:'Funktionen', nav_support:'Support',
    kicker:'Gewohnheitstracker für Mac', hero_title:'Gewohnheiten, die du schützen willst', hero_sub:'Lumenor macht Fortschritte sichtbar – ruhige, kontrastreiche Raster, Streak‑Leiste und Ein‑Klick‑Heute.',
    support_title:'Wir helfen gerne', support_sub:'Schreib uns – wir antworten per E‑Mail. Bitte nenne macOS‑Version und Schritte bei Fehlern.', label_name:'Name', label_email:'E‑Mail *', help_email:'Wir antworten an diese Adresse.', label_message:'Nachricht *', btn_send:'Nachricht senden', email_note:'Oder direkt mailen: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Zwei Raster, ein Ziel', feat1_desc:'Wechsle zwischen kompaktem numerischem Raster und kalenderbasiertem Raster – beides für den Dark Mode optimiert.',
    feat2_title:'Streak‑Leiste', feat2_desc:'Aktuelle und beste Serie auf einen Blick. Momentum zählt – schütze deine Serie mit einem Klick.',
    feat3_title:'Sanfte Erinnerungen', feat3_desc:'Tägliche Erinnerungen pro Gewohnheit zur passenden Zeit.',
    feat4_title:'Heute mit einem Klick', feat4_desc:'Check‑in mit einem Klick und sinnvoller Karenz. Kein Ballast – nur der nächste Schritt.',
    feat5_title:'Statistiken & Trends', feat5_desc:'Vergleiche die letzten 30 Tage, sieh Frost‑Zähler und exportiere Momentaufnahmen.',
    feat6_title:'Themes & eigene Looks', feat6_desc:'Wähle ruhige Themes, eigene Farben, Hintergründe und Kachelformen, die zu deinem Fokus passen.'
  },
  'fr-FR': {
    nav_features:'Fonctionnalités', nav_support:'Assistance',
    kicker:"Suivi d’habitudes sur Mac", hero_title:'Construisez des habitudes à protéger', hero_sub:'Lumenor rend les progrès évidents : grilles calmes et contrastées, barre de séries, check‑in du jour en un clic.',
    support_title:"Nous sommes là pour vous aider", support_sub:'Écrivez‑nous et nous répondrons par e‑mail. Ajoutez la version de macOS et les étapes en cas de bug.', label_name:'Nom', label_email:'E‑mail *', help_email:'Nous répondrons à cette adresse.', label_message:'Message *', btn_send:'Envoyer', email_note:'Ou écrivez‑nous : <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Deux grilles, un objectif', feat1_desc:'Basculez entre une grille Numérique compacte et une grille Calendrier — optimisées pour le mode sombre.',
    feat2_title:'Barre de séries', feat2_desc:'Voyez la série actuelle et la meilleure en un coup d’œil. Protégez votre élan avec un clic.',
    feat3_title:'Rappels doux', feat3_desc:'Rappels quotidiens par habitude à l’heure qui vous convient.',
    feat4_title:'Check‑in du jour', feat4_desc:'Un clic et un délai de grâce raisonnable. Pas de bruit — juste l’action suivante.',
    feat5_title:'Statistiques & tendances', feat5_desc:'Comparez les 30 derniers jours, voyez les jours gelés et exportez des aperçus à partager.',
    feat6_title:'Thèmes et styles', feat6_desc:'Choisissez des thèmes apaisants, vos couleurs, fonds et formes de tuiles adaptés à votre focus.'
  },
  'fr-CA': {
    nav_features:'Fonctionnalités', nav_support:'Assistance',
    kicker:"Suivi d’habitudes sur Mac", hero_title:'Créez des habitudes à préserver', hero_sub:'Lumenor clarifie vos progrès : grilles contrastées, barre de séries, check‑in du jour en un clic.',
    support_title:"Nous sommes là pour aider", support_sub:'Écrivez‑nous et nous répondrons par e‑mail.', label_name:'Nom', label_email:'Courriel *', help_email:'Nous répondrons à cette adresse.', label_message:'Message *', btn_send:'Envoyer', email_note:'Ou écrivez‑nous : <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Deux grilles, un objectif', feat1_desc:'Basculez entre la Numérique compacte et la Calendrier — optimisées pour le mode sombre.',
    feat2_title:'Barre de séries', feat2_desc:'Série actuelle et meilleure en un coup d’œil.',
    feat3_title:'Rappels doux', feat3_desc:'Rappels quotidiens par habitude à l’heure qui vous convient.',
    feat4_title:'Check‑in du jour', feat4_desc:'Un clic et un délai de grâce raisonnable.',
    feat5_title:'Statistiques & tendances', feat5_desc:'Comparez les 30 derniers jours, voyez les jours gelés et exportez des aperçus.',
    feat6_title:'Thèmes et styles', feat6_desc:'Choisissez des thèmes apaisants, vos couleurs, fonds et formes de tuiles.'
  },
  'nl-NL': {
    nav_features:'Functies', nav_support:'Support',
    kicker:'Gewoontetracker voor Mac', hero_title:'Bouw gewoontes die je wilt behouden', hero_sub:'Lumenor maakt voortgang zichtbaar: rustige, contrastrijke rasters, streak‑balk en Vandaag met één klik.',
    support_title:'We helpen graag', support_sub:'Stuur ons een bericht; we antwoorden per e‑mail.', label_name:'Naam', label_email:'E‑mail *', help_email:'We antwoorden op dit adres.', label_message:'Bericht *', btn_send:'Verzenden', email_note:'Of mail ons: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Twee rasters, één doel', feat1_desc:'Schakel tussen een compact Numeriek raster en een kalenderuitlijning — geoptimaliseerd voor donker thema.',
    feat2_title:'Streak‑balk', feat2_desc:'Zie huidige en beste reeks in één oogopslag.',
    feat3_title:'Zachte herinneringen', feat3_desc:'Dagelijkse herinneringen per gewoonte op jouw tijd.',
    feat4_title:'Vandaag met één klik', feat4_desc:'Check in met één klik en redelijke respijt.',
    feat5_title:'Statistieken & trends', feat5_desc:'Vergelijk de laatste 30 dagen, bekijk freeze‑tellingen en exporteer momentopnamen.',
    feat6_title:'Thema’s en looks', feat6_desc:'Kies rustige thema’s, eigen kleuren, achtergronden en tegelvormen die bij je focus passen.'
  },
  'ja': {
    nav_features:'機能', nav_support:'サポート',
    kicker:'Mac用習慣トラッカー', hero_title:'守りたくなる習慣をつくる', hero_sub:'Lumenorは進捗を見える化。落ち着いた高コントラストのグリッド、ストリークバー、今日のワンクリック記録。',
    support_title:'サポート', support_sub:'メールでご連絡ください。macOSのバージョンや再現手順があると助かります。', label_name:'お名前', label_email:'メール *', help_email:'このアドレスに返信します。', label_message:'メッセージ *', btn_send:'送信', email_note:'もしくは直接メール: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'2つのグリッド、1つの目的', feat1_desc:'数値グリッドとカレンダーグリッドを切り替え。どちらもダークモードに最適化。',
    feat2_title:'ストリークバー', feat2_desc:'現在とベストの連続日数を一目で確認。',
    feat3_title:'やさしいリマインダー', feat3_desc:'習慣ごとの毎日リマインダーを好きな時間に。',
    feat4_title:'今日をワンクリック', feat4_desc:'ワンクリックと適切な猶予時間で記録。',
    feat5_title:'統計とトレンド', feat5_desc:'直近30日の比較、凍結の日数、共有用のエクスポートで進捗を把握。',
    feat6_title:'テーマとカスタム外観', feat6_desc:'落ち着いたテーマ、色、壁紙、タイル形状を好みに合わせて選べます。'
  },
  'ko': {
    nav_features:'기능', nav_support:'지원',
    kicker:'Mac용 습관 트래커', hero_title:'지키고 싶은 습관 만들기', hero_sub:'Lumenor는 진행을 또렷하게 보여줍니다. 고대비 그리드, 스트릭 바, 오늘 한 번에 체크.',
    support_title:'도움이 필요하신가요?', support_sub:'이메일로 문의해 주세요. macOS 버전과 재현 단계를 알려주시면 더 빠릅니다.', label_name:'이름', label_email:'이메일 *', help_email:'이 주소로 답장합니다.', label_message:'메시지 *', btn_send:'보내기', email_note:'또는 이메일: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'두 가지 그리드, 하나의 목표', feat1_desc:'숫자 그리드와 캘린더 그리드를 전환 — 다크 모드에 최적화.',
    feat2_title:'스트릭 카운터 바', feat2_desc:'현재/최고 연속 기록을 한눈에.',
    feat3_title:'부드러운 알림', feat3_desc:'습관별 매일 알림을 원하는 시간에.',
    feat4_title:'오늘 한 번에', feat4_desc:'합리적인 유예와 함께 한 번의 클릭으로 체크.',
    feat5_title:'통계와 트렌드', feat5_desc:'최근 30일 비교, 프리즈 횟수, 공유용 내보내기로 진행을 확인하세요.',
    feat6_title:'테마와 맞춤 스타일', feat6_desc:'차분한 테마, 커스텀 색상, 배경, 타일 형태까지 원하는 대로 고르세요.'
  },
  'nb': {
    nav_features:'Funksjoner', nav_support:'Support',
    kicker:'Vanesporing for Mac', hero_title:'Bygg vaner du vil beskytte', hero_sub:'Lumenor gjør fremdrift tydelig: rolige, høy‑kontrast rutenett, streak‑linje og I dag med ett klikk.',
    support_title:'Vi er her for å hjelpe', support_sub:'Send oss en melding; vi svarer på e‑post.', label_name:'Navn', label_email:'E‑post *', help_email:'Vi svarer til denne adressen.', label_message:'Melding *', btn_send:'Send melding', email_note:'Eller send e‑post: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'To rutenett, ett mål', feat1_desc:'Bytt mellom numerisk og kalender — optimalisert for mørk modus.',
    feat2_title:'Streak‑linje', feat2_desc:'Se nåværende og beste på et øyeblikk.',
    feat3_title:'Varsomme påminnelser', feat3_desc:'Daglige påminnelser per vane når det passer.',
    feat4_title:'I dag med ett klikk', feat4_desc:'Én klikk og rimelig frist. Ingen støy.',
    feat5_title:'Statistikk og trender', feat5_desc:'Sammenlign de siste 30 dagene, se antall fryses og eksporter øyeblikksbilder.',
    feat6_title:'Temaer og egne uttrykk', feat6_desc:'Velg rolige temaer, egne farger, bakgrunner og fliseformer som passer fokuset ditt.'
  },
  'sv': {
    nav_features:'Funktioner', nav_support:'Support',
    kicker:'Vanespårare för Mac', hero_title:'Bygg vanor du vill skydda', hero_sub:'Lumenor gör framsteg tydliga: lugna, högkontrast‑rutnät, streak‑rad och Idag med ett klick.',
    support_title:'Vi finns här för att hjälpa', support_sub:'Skicka ett meddelande; vi svarar via e‑post.', label_name:'Namn', label_email:'E‑post *', help_email:'Vi svarar på denna adress.', label_message:'Meddelande *', btn_send:'Skicka', email_note:'Eller mejla oss: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Två rutnät, ett mål', feat1_desc:'Växla mellan numeriskt och kalender — optimerat för mörkt läge.',
    feat2_title:'Streak‑rad', feat2_desc:'Se aktuell och bästa streak direkt.',
    feat3_title:'Varsamma påminnelser', feat3_desc:'Dagliga påminnelser per vana när det passar.',
    feat4_title:'Idag med ett klick', feat4_desc:'Ett klick och rimlig respit. Ingen röra.',
    feat5_title:'Statistik och trender', feat5_desc:'Jämför de senaste 30 dagarna, se frysräknare och exportera ögonblicksbilder.',
    feat6_title:'Teman och stilar', feat6_desc:'Välj lugna teman, egna färger, bakgrunder och kakelformer som passar ditt fokus.'
  }
};
