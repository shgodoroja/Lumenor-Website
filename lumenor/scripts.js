// Lumenor site JS

function byId(id){ return document.getElementById(id); }

function track(event, data){
  // placeholder for analytics hook
  // console.log('track', event, data)
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
  setText('nav_pricing', t.nav_pricing);
  setText('nav_support', t.nav_support);
  setText('kicker', t.kicker);
  setText('hero_title', t.hero_title);
  setText('hero_sub', t.hero_sub);
  setText('price_label', t.price_label);
  setText('pricing_title', t.pricing_title);
  setText('pricing_desc', t.pricing_desc);
  setText('cta_get', t.cta_get);
  setText('cta_support', t.cta_support);

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
    nav_features:'Features', nav_pricing:'Pricing', nav_support:'Support',
    kicker:'Habit tracker for Mac', hero_title:"Build habits you’ll want to protect", hero_sub:'Lumenor makes progress obvious with calm, high‑contrast grids, a motivating Streak Counter Bar, and one‑click Today check‑ins. Stay on track with gentle reminders and a clear month view.',
    price_label:'One‑time purchase • $14.99 / €14.99', pricing_title:'Simple pricing', pricing_desc:'One‑time purchase — no subscriptions. Regional pricing aligns to your App Store: $14.99 / €14.99.', cta_get:'Get Lumenor', cta_support:'Questions? Contact support →',
    support_title:"We’re here to help", support_sub:'Send us a note and we’ll reply by email. Include details like macOS version and steps to reproduce if you’re reporting an issue.', label_name:'Name', label_email:'Email *', help_email:'We’ll reply to this address.', label_message:'Message *', btn_send:'Send message', email_note:'Or email us directly: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Two grids, one goal', feat1_desc:'Switch between a compact Numeric grid and a date‑aligned Calendar grid — both optimized for dark mode and readability.',
    feat2_title:'Streak Counter Bar', feat2_desc:'See current and best streaks at a glance. Momentum matters — protect your run with one‑click check‑ins.',
    feat3_title:'Gentle reminders', feat3_desc:'Create per‑habit daily reminders at the time that works for you. Lumenor nudges; you stay in control.',
    feat4_title:'One‑click Today', feat4_desc:'Check in with a single click and a sensible grace window. No clutter — just the next right action.',
    feat5_title:'Folders & challenges', feat5_desc:'Group habits into folders and track ongoing routines or fixed‑length challenges with equal ease.',
    feat6_title:'On‑device privacy', feat6_desc:'No accounts, no cloud lock‑in. Your data stays on your Mac and works offline.'
  },
  'en-AU': {
    nav_features:'Features', nav_pricing:'Pricing', nav_support:'Support',
    kicker:'Habit tracker for Mac', hero_title:'Build habits you’ll want to protect', hero_sub:'Lumenor makes progress obvious with calm, high‑contrast grids, a motivating Streak Counter Bar, and one‑click Today check‑ins. Stay on track with gentle reminders and a clear month view.',
    price_label:'One‑time purchase • $14.99 / €14.99', pricing_title:'Simple pricing', pricing_desc:'One‑time purchase — no subscriptions. Regional pricing aligns to your App Store: $14.99 / €14.99.', cta_get:'Get Lumenor', cta_support:'Questions? Contact support →',
    support_title:"We’re here to help", support_sub:'Send us a note and we’ll reply by email. Include details like macOS version and steps to reproduce if you’re reporting an issue.', label_name:'Name', label_email:'Email *', help_email:'We’ll reply to this address.', label_message:'Message *', btn_send:'Send message', email_note:'Or email us directly: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Two grids, one goal', feat1_desc:'Switch between a compact Numeric grid and a date‑aligned Calendar grid — both optimised for dark mode and readability.',
    feat2_title:'Streak Counter Bar', feat2_desc:'See current and best streaks at a glance. Momentum matters — protect your run with one‑click check‑ins.',
    feat3_title:'Gentle reminders', feat3_desc:'Create per‑habit daily reminders at the time that works for you. Lumenor nudges; you stay in control.',
    feat4_title:'One‑click Today', feat4_desc:'Check in with a single click and a sensible grace window. No clutter — just the next right action.',
    feat5_title:'Folders & challenges', feat5_desc:'Group habits into folders and track ongoing routines or fixed‑length challenges with equal ease.',
    feat6_title:'On‑device privacy', feat6_desc:'No accounts, no cloud lock‑in. Your data stays on your Mac and works offline.'
  },
  'da': {
    nav_features:'Funktioner', nav_pricing:'Pris', nav_support:'Support',
    kicker:'Vanesporing til Mac', hero_title:'Byg vaner, du vil beskytte', hero_sub:'Lumenor gør fremskridt tydelige med rolige, høj‑kontrast gittere, en motiverende streak‑linje og ét‑klik tjek‑ind for I dag.',
    price_label:'Engangskøb • $14.99 / €14.99', pricing_title:'Simpel pris', pricing_desc:'Engangskøb — ingen abonnementer. Regional pris: $14.99 / €14.99.', cta_get:'Få Lumenor', cta_support:'Spørgsmål? Kontakt support →',
    support_title:'Vi er her for at hjælpe', support_sub:'Send os en besked, så svarer vi pr. e‑mail. Tilføj macOS‑version og trin ved fejl.', label_name:'Navn', label_email:'E‑mail *', help_email:'Vi svarer til denne adresse.', label_message:'Besked *', btn_send:'Send besked', email_note:'Eller skriv direkte: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'To gittere, ét mål', feat1_desc:'Skift mellem et kompakt numerisk gitter og et kalendergitter — begge optimeret til mørk tilstand og læsbarhed.',
    feat2_title:'Streak‑linje', feat2_desc:'Se aktuel og bedste streak med det samme. Momentum betyder noget — beskyt din serie med ét klik.',
    feat3_title:'Blide påmindelser', feat3_desc:'Opret daglige påmindelser pr. vane på det tidspunkt, der passer dig.',
    feat4_title:'Ét‑klik I dag', feat4_desc:'Tjek ind med et enkelt klik og en fornuftig frist. Ingen støj — kun næste handling.',
    feat5_title:'Mapper & udfordringer', feat5_desc:'Organisér vaner i mapper og spor løbende rutiner eller tidsbegrænsede forløb.',
    feat6_title:'Data på enheden', feat6_desc:'Ingen konto, ingen låsning til skyen. Dine data bliver på din Mac.'
  },
  'de-DE': {
    nav_features:'Funktionen', nav_pricing:'Preis', nav_support:'Support',
    kicker:'Gewohnheitstracker für Mac', hero_title:'Gewohnheiten, die du schützen willst', hero_sub:'Lumenor macht Fortschritte sichtbar – ruhige, kontrastreiche Raster, Streak‑Leiste und Ein‑Klick‑Heute.',
    price_label:'Einmalkauf • $14.99 / €14.99', pricing_title:'Einfacher Preis', pricing_desc:'Einmalkauf — kein Abo. Regionale Preise: $14.99 / €14.99.', cta_get:'Lumenor laden', cta_support:'Fragen? Support kontaktieren →',
    support_title:'Wir helfen gerne', support_sub:'Schreib uns – wir antworten per E‑Mail. Bitte nenne macOS‑Version und Schritte bei Fehlern.', label_name:'Name', label_email:'E‑Mail *', help_email:'Wir antworten an diese Adresse.', label_message:'Nachricht *', btn_send:'Nachricht senden', email_note:'Oder direkt mailen: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Zwei Raster, ein Ziel', feat1_desc:'Wechsle zwischen kompaktem numerischem Raster und kalenderbasiertem Raster – beides für den Dark Mode optimiert.',
    feat2_title:'Streak‑Leiste', feat2_desc:'Aktuelle und beste Serie auf einen Blick. Momentum zählt – schütze deine Serie mit einem Klick.',
    feat3_title:'Sanfte Erinnerungen', feat3_desc:'Tägliche Erinnerungen pro Gewohnheit zur passenden Zeit.',
    feat4_title:'Heute mit einem Klick', feat4_desc:'Check‑in mit einem Klick und sinnvoller Karenz. Kein Ballast – nur der nächste Schritt.',
    feat5_title:'Ordner & Challenges', feat5_desc:'Gewohnheiten in Ordnern organisieren; laufende Routinen oder zeitlich begrenzte Challenges tracken.',
    feat6_title:'Lokale Daten', feat6_desc:'Kein Konto, keine Cloud‑Bindung. Deine Daten bleiben auf deinem Mac.'
  },
  'fr-FR': {
    nav_features:'Fonctionnalités', nav_pricing:'Tarif', nav_support:'Assistance',
    kicker:"Suivi d’habitudes sur Mac", hero_title:'Construisez des habitudes à protéger', hero_sub:'Lumenor rend les progrès évidents : grilles calmes et contrastées, barre de séries, check‑in du jour en un clic.',
    price_label:'Achat unique • $14.99 / €14.99', pricing_title:'Tarif simple', pricing_desc:'Achat unique — pas d’abonnement. Prix régional : $14.99 / €14.99.', cta_get:'Obtenir Lumenor', cta_support:'Des questions ? Contactez l’assistance →',
    support_title:"Nous sommes là pour vous aider", support_sub:'Écrivez‑nous et nous répondrons par e‑mail. Ajoutez la version de macOS et les étapes en cas de bug.', label_name:'Nom', label_email:'E‑mail *', help_email:'Nous répondrons à cette adresse.', label_message:'Message *', btn_send:'Envoyer', email_note:'Ou écrivez‑nous : <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Deux grilles, un objectif', feat1_desc:'Basculez entre une grille Numérique compacte et une grille Calendrier — optimisées pour le mode sombre.',
    feat2_title:'Barre de séries', feat2_desc:'Voyez la série actuelle et la meilleure en un coup d’œil. Protégez votre élan avec un clic.',
    feat3_title:'Rappels doux', feat3_desc:'Rappels quotidiens par habitude à l’heure qui vous convient.',
    feat4_title:'Check‑in du jour', feat4_desc:'Un clic et un délai de grâce raisonnable. Pas de bruit — juste l’action suivante.',
    feat5_title:'Dossiers & défis', feat5_desc:'Organisez et suivez des routines continues ou des défis à durée fixe.',
    feat6_title:'Données sur l’appareil', feat6_desc:'Sans compte ni verrouillage cloud. Vos données restent sur votre Mac.'
  },
  'fr-CA': {
    nav_features:'Fonctionnalités', nav_pricing:'Tarif', nav_support:'Assistance',
    kicker:"Suivi d’habitudes sur Mac", hero_title:'Créez des habitudes à préserver', hero_sub:'Lumenor clarifie vos progrès : grilles contrastées, barre de séries, check‑in du jour en un clic.',
    price_label:'Achat unique • $14.99 / €14.99', pricing_title:'Tarif simple', pricing_desc:'Achat unique — pas d’abonnement. Prix régional : $14.99 / €14.99.', cta_get:'Obtenir Lumenor', cta_support:"Des questions ? Contactez l’assistance →",
    support_title:"Nous sommes là pour aider", support_sub:'Écrivez‑nous et nous répondrons par e‑mail.', label_name:'Nom', label_email:'Courriel *', help_email:'Nous répondrons à cette adresse.', label_message:'Message *', btn_send:'Envoyer', email_note:'Ou écrivez‑nous : <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Deux grilles, un objectif', feat1_desc:'Basculez entre la Numérique compacte et la Calendrier — optimisées pour le mode sombre.',
    feat2_title:'Barre de séries', feat2_desc:'Série actuelle et meilleure en un coup d’œil.',
    feat3_title:'Rappels doux', feat3_desc:'Rappels quotidiens par habitude à l’heure qui vous convient.',
    feat4_title:'Check‑in du jour', feat4_desc:'Un clic et un délai de grâce raisonnable.',
    feat5_title:'Dossiers & défis', feat5_desc:'Organisez et suivez vos habitudes facilement.',
    feat6_title:'Données locales', feat6_desc:'Sans compte, vos données restent sur votre Mac.'
  },
  'nl-NL': {
    nav_features:'Functies', nav_pricing:'Prijs', nav_support:'Support',
    kicker:'Gewoontetracker voor Mac', hero_title:'Bouw gewoontes die je wilt behouden', hero_sub:'Lumenor maakt voortgang zichtbaar: rustige, contrastrijke rasters, streak‑balk en Vandaag met één klik.',
    price_label:'Eenmalige aankoop • $14.99 / €14.99', pricing_title:'Eenvoudige prijs', pricing_desc:'Eenmalige aankoop — geen abonnement. Regionale prijs: $14.99 / €14.99.', cta_get:'Download Lumenor', cta_support:'Vragen? Neem contact op →',
    support_title:'We helpen graag', support_sub:'Stuur ons een bericht; we antwoorden per e‑mail.', label_name:'Naam', label_email:'E‑mail *', help_email:'We antwoorden op dit adres.', label_message:'Bericht *', btn_send:'Verzenden', email_note:'Of mail ons: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Twee rasters, één doel', feat1_desc:'Schakel tussen een compact Numeriek raster en een kalenderuitlijning — geoptimaliseerd voor donker thema.',
    feat2_title:'Streak‑balk', feat2_desc:'Zie huidige en beste reeks in één oogopslag.',
    feat3_title:'Zachte herinneringen', feat3_desc:'Dagelijkse herinneringen per gewoonte op jouw tijd.',
    feat4_title:'Vandaag met één klik', feat4_desc:'Check in met één klik en redelijke respijt.',
    feat5_title:'Mappen & uitdagingen', feat5_desc:'Orden gewoontes en volg doorlopend of per challenge.',
    feat6_title:'Gegevens op het apparaat', feat6_desc:'Geen account, geen cloud lock‑in. Data blijft op je Mac.'
  },
  'ja': {
    nav_features:'機能', nav_pricing:'価格', nav_support:'サポート',
    kicker:'Mac用習慣トラッカー', hero_title:'守りたくなる習慣をつくる', hero_sub:'Lumenorは進捗を見える化。落ち着いた高コントラストのグリッド、ストリークバー、今日のワンクリック記録。',
    price_label:'買い切り • $14.99 / €14.99', pricing_title:'シンプルな価格', pricing_desc:'買い切り — サブスクなし。地域に合わせた価格: $14.99 / €14.99。', cta_get:'Lumenor を入手', cta_support:'ご質問はこちら →',
    support_title:'サポート', support_sub:'メールでご連絡ください。macOSのバージョンや再現手順があると助かります。', label_name:'お名前', label_email:'メール *', help_email:'このアドレスに返信します。', label_message:'メッセージ *', btn_send:'送信', email_note:'もしくは直接メール: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'2つのグリッド、1つの目的', feat1_desc:'数値グリッドとカレンダーグリッドを切り替え。どちらもダークモードに最適化。',
    feat2_title:'ストリークバー', feat2_desc:'現在とベストの連続日数を一目で確認。',
    feat3_title:'やさしいリマインダー', feat3_desc:'習慣ごとの毎日リマインダーを好きな時間に。',
    feat4_title:'今日をワンクリック', feat4_desc:'ワンクリックと適切な猶予時間で記録。',
    feat5_title:'フォルダとチャレンジ', feat5_desc:'フォルダ整理。継続型・期間限定どちらも対応。',
    feat6_title:'端末内データ', feat6_desc:'アカウント不要。データはMac内に保存。'
  },
  'ko': {
    nav_features:'기능', nav_pricing:'가격', nav_support:'지원',
    kicker:'Mac용 습관 트래커', hero_title:'지키고 싶은 습관 만들기', hero_sub:'Lumenor는 진행을 또렷하게 보여줍니다. 고대비 그리드, 스트릭 바, 오늘 한 번에 체크.',
    price_label:'일회성 구매 • $14.99 / €14.99', pricing_title:'단순한 가격', pricing_desc:'일회성 — 구독 없음. 지역 가격: $14.99 / €14.99.', cta_get:'Lumenor 받기', cta_support:'문의하기 →',
    support_title:'도움이 필요하신가요?', support_sub:'이메일로 문의해 주세요. macOS 버전과 재현 단계를 알려주시면 더 빠릅니다.', label_name:'이름', label_email:'이메일 *', help_email:'이 주소로 답장합니다.', label_message:'메시지 *', btn_send:'보내기', email_note:'또는 이메일: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'두 가지 그리드, 하나의 목표', feat1_desc:'숫자 그리드와 캘린더 그리드를 전환 — 다크 모드에 최적화.',
    feat2_title:'스트릭 카운터 바', feat2_desc:'현재/최고 연속 기록을 한눈에.',
    feat3_title:'부드러운 알림', feat3_desc:'습관별 매일 알림을 원하는 시간에.',
    feat4_title:'오늘 한 번에', feat4_desc:'합리적인 유예와 함께 한 번의 클릭으로 체크.',
    feat5_title:'폴더 & 챌린지', feat5_desc:'폴더로 정리, 상시/기간 챌린지 모두 지원.',
    feat6_title:'기기 내 개인정보', feat6_desc:'계정 없음, 클라우드 종속 없음. 데이터는 Mac에 저장.'
  },
  'nb': {
    nav_features:'Funksjoner', nav_pricing:'Pris', nav_support:'Support',
    kicker:'Vanesporing for Mac', hero_title:'Bygg vaner du vil beskytte', hero_sub:'Lumenor gjør fremdrift tydelig: rolige, høy‑kontrast rutenett, streak‑linje og I dag med ett klikk.',
    price_label:'Engangskjøp • $14.99 / €14.99', pricing_title:'Enkel pris', pricing_desc:'Engangskjøp — ingen abonnement. Regional pris: $14.99 / €14.99.', cta_get:'Få Lumenor', cta_support:'Spørsmål? Kontakt support →',
    support_title:'Vi er her for å hjelpe', support_sub:'Send oss en melding; vi svarer på e‑post.', label_name:'Navn', label_email:'E‑post *', help_email:'Vi svarer til denne adressen.', label_message:'Melding *', btn_send:'Send melding', email_note:'Eller send e‑post: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'To rutenett, ett mål', feat1_desc:'Bytt mellom numerisk og kalender — optimalisert for mørk modus.',
    feat2_title:'Streak‑linje', feat2_desc:'Se nåværende og beste på et øyeblikk.',
    feat3_title:'Varsomme påminnelser', feat3_desc:'Daglige påminnelser per vane når det passer.',
    feat4_title:'I dag med ett klikk', feat4_desc:'Én klikk og rimelig frist. Ingen støy.',
    feat5_title:'Mapper & utfordringer', feat5_desc:'Organiser vaner og spor løpende eller tidsavgrenset.',
    feat6_title:'Data på enheten', feat6_desc:'Ingen konto, ingen sky‑lås. Data blir på Mac‑en.'
  },
  'sv': {
    nav_features:'Funktioner', nav_pricing:'Pris', nav_support:'Support',
    kicker:'Vanespårare för Mac', hero_title:'Bygg vanor du vill skydda', hero_sub:'Lumenor gör framsteg tydliga: lugna, högkontrast‑rutnät, streak‑rad och Idag med ett klick.',
    price_label:'Engångsköp • $14.99 / €14.99', pricing_title:'Enkel prissättning', pricing_desc:'Engångsköp — inget abonnemang. Regionalt pris: $14.99 / €14.99.', cta_get:'Hämta Lumenor', cta_support:'Frågor? Kontakta support →',
    support_title:'Vi finns här för att hjälpa', support_sub:'Skicka ett meddelande; vi svarar via e‑post.', label_name:'Namn', label_email:'E‑post *', help_email:'Vi svarar på denna adress.', label_message:'Meddelande *', btn_send:'Skicka', email_note:'Eller mejla oss: <a href="mailto:lumenorapp@babaheights.com">lumenorapp@babaheights.com</a>',
    feat1_title:'Två rutnät, ett mål', feat1_desc:'Växla mellan numeriskt och kalender — optimerat för mörkt läge.',
    feat2_title:'Streak‑rad', feat2_desc:'Se aktuell och bästa streak direkt.',
    feat3_title:'Varsamma påminnelser', feat3_desc:'Dagliga påminnelser per vana när det passar.',
    feat4_title:'Idag med ett klick', feat4_desc:'Ett klick och rimlig respit. Ingen röra.',
    feat5_title:'Mappar & utmaningar', feat5_desc:'Organisera vanor och följ löpande eller tidsbegränsat.',
    feat6_title:'Data på enheten', feat6_desc:'Inget konto, ingen moln‑inlåsning. Data stannar på din Mac.'
  }
};
