// ════════════════════════════════════════════
//   ADAQUIZ — script.js
//   Certaines fonctions sont déjà écrites.
//   Les fonctions marquées TODO sont à compléter.
// ════════════════════════════════════════════


// ── Sélection des éléments DOM ──────────────
// Ces lignes récupèrent les éléments HTML par leur id.
// Tu n'as pas besoin de les modifier.

const btnCommencer = document.getElementById('btn-commencer');
const btnRecommencer = document.getElementById('btn-recommencer');
const questionEnCours = document.getElementById('question-en-cours');
// ECRAN
const ecranAccueil = document.getElementById('ecran-accueil');
const ecranQuestion = document.getElementById('ecran-question');
const ecranResultats = document.getElementById('ecran-resultats');
const ecran = document.querySelector('.ecran');
console.log("Écran :", ecran);

const imageQuestion = document.getElementById('image-question')
const texteQuestion = document.getElementById('texte-question');
const totalQuestions = document.getElementById('total-question');
const enCoursQuestion = document.getElementById('question-actuelle');
const commentaireQuestion = document.getElementById('commentaires');

const scoreDynamique = document.getElementById('score');
const scoreFinal = document.getElementById('score-final');
const scoreMaximum = document.getElementById('score-maximum');

const listeReponses = document.getElementById('input-question');
const resutatMessage = document.getElementById('resultat-message');

const btnSuivante = document.getElementById('btn-suivante');


const progressBar = document.getElementById('progress-bar');

const resultatMessage = document.getElementById('resultat-message');
//... Crée autant de constantes que d'éléments HTML à récupérer


// ── État du quiz ─────────────────────────────
// Ces variables stockent les données en cours de partie.
// Tu n'as pas besoin de les modifier.

// let questions = []   // tableau des questions chargées depuis le JSON
let indexCourant = 0    // numéro de la question en cours (commence à 0)
let score = 0    // nombre de bonnes réponses
let reponsesDesactive = false;
// btnCommencer.addEventListener("click", () =>{
//   afficher(ecranQuestion);
// })
// btnSuivante.addEventListener("click", questionSuivante);
// btnRecommencer.addEventListener("click", recommencer)
btnCommencer.addEventListener("click", () =>{
  lire();
  afficher(ecranQuestion);
  afficherQuestion();
})

const lire = () =>{
  indexCourant = 0;
  score = 0; 
  scoreDynamique.textContent = score;
}




// ── Navigation entre les écrans ──────────────
// Cette fonction est déjà écrite.
// Elle cache tous les écrans puis affiche celui qu'on lui donne.

const afficher = (ecranAAfficher) => {
  ecranAccueil.classList.add('cache')
  // ecranAccueil.classList.remove('cache')
  ecranQuestion.classList.add('cache')
  // ecranQuestion.classList.add('cache')
  ecranResultats.classList.add('cache')
  // ecranResultats.classList.toggle('cache')
  // ecranResultats.classList.remove('cache')
  ecranAAfficher.classList.remove('cache');

}


// ════════════════════════════════════════════
//   TODO — Fonctions à compléter
// ════════════════════════════════════════════


// ── TODO : afficherQuestion ──────────────────
// Cette fonction doit afficher la question en cours.
// Elle est appelée au début de chaque nouvelle question.
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante : questions[indexCourant]
//   2. Mettre à jour la barre de progression
//   3. Mettre à jour le compteur ("Question X / Y")
//   4. Afficher le texte de la question dans #texte-question
//   5. Cacher le bouton "Question suivante"
//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic

// const afficherQuestion = () => {
//   // Écris ton code ici
// }
const afficherQuestion = () => {
  reponsesDesactive = false;
  const q = questions[indexCourant];
  // const progressPercent = (indexCourant + 1) / questions.length * 100;
  // progressBar.style.width = progressPercent + "%";
  enCoursQuestion.textContent = indexCourant + 1
  texteQuestion.textContent = q.question;  // modifier
  imageQuestion.src = q.image;
  
  listeReponses.innerHTML = "";            // vider
  commentaireQuestion.textContent = "";

  q.reponses.forEach((reponse, index) => {
    const btn = document.createElement("button"); // créer
    btn.textContent = reponse;

    btn.classList.add("btn-reponse");          // modifier
    const estLaBonne = (index === q.bonneReponse)
    btn.dataset.correct = estLaBonne;
    btn.addEventListener("click", () => {  // écouter
      verifierReponse(index)

    })
    listeReponses.appendChild(btn)             // insérer
  })
}

// ── TODO : verifierReponse ───────────────────
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante
//   2. Désactiver tous les boutons de réponse
//   3. Colorier en vert la bonne réponse (ajouter la classe "correcte")
//   4. Si la réponse choisie est mauvaise, la colorier en rouge ("incorrecte")
//   5. Si la réponse est bonne, incrémenter le score
//   6. Afficher le bouton "Question suivante"

const verifierReponse = (indexChoisi) => {
  // Écris ton code ici
  if(reponsesDesactive) return
  reponsesDesactive = true;

  const boutonChoisi = listeReponses.children[indexChoisi];
  const estCorrect = (boutonChoisi.dataset.correct === "true");

  if(estCorrect){
      boutonChoisi.classList.add("correct");
      score++;
      scoreDynamique.textContent = score;
      commentaireQuestion.textContent = "Bonne réponse !";
    }else{
      boutonChoisi.classList.add("incorrect");
      // commentaireQuestion.classList.add("incorrect");
      commentaireQuestion.textContent = "Mauvaise réponse !";
    
      Array.from(listeReponses.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
          button.classList.add("correct");
        }
      });
    }
    btnSuivante.classList.remove("cache");
};

  btnSuivante.addEventListener("click", () => {
    indexCourant++;
    console.log("Index actuel :", indexCourant, "Nombre de questions :", questions.length);
    if (indexCourant < questions.length) {
      afficherQuestion();
      btnSuivante.classList.add("cache"); 
    } else {
      console.log("Le protocole est terminé, passage aux résultats !");
      // btnSuivante.classList.add("cache");
      afficherResultats(); 
    }
  });

  
// ── TODO : afficherResultats ─────────────────
// Cette fonction est appelée quand toutes les questions ont été répondues.
//
// Ce qu'elle doit faire :
//   1. Afficher le score dans #score-final (ex. "4 / 7")
//   2. Afficher un message dans #message-fin selon le score
//   3. Appeler afficher(ecranResultats) pour passer à l'écran résultats

const afficherResultats = () => {
  // Écris ton code ici
  afficher(ecranResultats);
  scoreFinal.textContent = score;
  scoreMaximum.textContent = questions.length;

  const percentage = (score / questions.length)*100;
  if(percentage === 100){
    resultatMessage.textContent = "Parfait";
  }else if(percentage >= 80){
    resultatMessage.textContent = "Bon travail";
  }else if(percentage >= 60){
    resultatMessage.textContent = "Pas mal";
  }else if(percentage >= 40){
    resultatMessage.textContent = "Essaie encore";
  }else{
    resultatMessage.textContent = "Entraîne toi plus souvent"
  }  
};

btnRecommencer.addEventListener("click", () =>{
  afficher(ecranAccueil);

})


// ── TODO : écouteurs d'événements ───────────
// Branche les boutons sur les bonnes fonctions.
//
// À faire :
//   - btn-commencer → afficher l'écran question + appeler afficherQuestion()
//   - btn-suivant   → passer à la question suivante ou aux résultats
//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil

// Écris ton code ici
