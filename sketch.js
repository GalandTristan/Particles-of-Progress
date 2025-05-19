let nodes = [];
let edges = [];
let labels = ['X', 'Y', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let padding = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');
  textSize(16);
  textAlign(CENTER, CENTER);

  // Créer les nœuds

for (let i = 0; i < 50; i++) {
  nodes.push({
    x: random(padding, width - padding),
    y: random(padding, height - padding),
    vx: random(-0.5, 0.5),
    vy: random(-0.5, 0.5),
    label: random(labels),
    nextChange: millis() + random(50, 50)
  });
}


  // Créer des liens entre les nœuds
  for (let i = 0; i < 150; i++) {
    edges.push([
      floor(random(nodes.length)),
      floor(random(nodes.length))
    ]);
  }
}

function draw() {
  background(255);

  // Tracer les arêtes
  stroke(0, 80);
  strokeWeight(1);
  for (let [a, b] of edges) {
    let na = nodes[a];
    let nb = nodes[b];
    line(na.x, na.y, nb.x, nb.y);
  }

  // Mettre à jour et dessiner les nœuds
  for (let node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    // Rebond sur les bords
    if (node.x < padding || node.x > width - padding) node.vx *= -1;
    if (node.y < padding || node.y > height - padding) node.vy *= -1;

    // Changer le caractère à intervalle aléatoire
    if (millis() > node.nextChange) {
      node.label = random(labels);
      node.nextChange = millis() + random(50, 50); // prochain changement
    }

    fill(0);
    noStroke();
    ellipse(node.x, node.y, 5, 5); // le point

    text(node.label, node.x, node.y - 12); // le caractère
  }
}
