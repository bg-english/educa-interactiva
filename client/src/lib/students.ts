export interface Student {
  name: string;
  email: string;
  group: '8th Blue' | '8th Red' | 'Teacher';
}

export const students: Student[] = [
  // 8th Blue
  { name: 'Fiorella Aronna Campo', email: 'fiorellaaronna@redboston.edu.co', group: '8th Blue' },
  { name: 'Mathias Bello Piraquive', email: 'mathiasbello@redboston.edu.co', group: '8th Blue' },
  { name: 'Danette Sofia Caicedo Montes', email: 'danette@redboston.edu.co', group: '8th Blue' },
  { name: 'Juan Sebastian Calvo Valega', email: 'juan.s.calvo@redboston.edu.co', group: '8th Blue' },
  { name: 'Diego Castilla Ordoñez', email: 'diegocastilla@redboston.edu.co', group: '8th Blue' },
  { name: 'Sebastian Jose Castro Reales', email: 'sebastiancas@redboston.edu.co', group: '8th Blue' },
  { name: 'Gabriela Diaz Castro', email: 'gabrieladiaz@redboston.edu.co', group: '8th Blue' },
  { name: 'Lionel Mathias Floriano Martinez', email: 'lionelfloriano@redboston.edu.co', group: '8th Blue' },
  { name: 'Valerie Lizarazo Llanos', email: 'valerielizarazo@redboston.edu.co', group: '8th Blue' },
  { name: 'Sofia Isabel Maradei Beleño', email: 'sofiamaradey@redboston.edu.co', group: '8th Blue' },
  { name: 'Samuel David Niño Romero', email: 'samuel@redboston.edu.co', group: '8th Blue' },
  { name: 'Miguel Angel Panciera Dizzopola', email: 'miguelpanciera@redboston.edu.co', group: '8th Blue' },
  { name: 'Luciana Sofia Pedraza Medrano', email: 'lucianapedraza@redboston.edu.co', group: '8th Blue' },
  { name: 'Sarah Paola Perez Ahumada', email: 'sarahperez@redboston.edu.co', group: '8th Blue' },
  { name: 'Samuel Porto Rangel', email: 'samuelporto@redboston.edu.co', group: '8th Blue' },
  { name: 'Jose Alejandro Quintero Puentes', email: 'jose@redboston.edu.co', group: '8th Blue' },
  { name: 'Valentina Reyes Cohen', email: 'valentinareyes@redboston.edu.co', group: '8th Blue' },
  { name: 'Nadia Rodriguez Cadavid', email: 'nadiarodriguez@redboston.edu.co', group: '8th Blue' },
  { name: 'Kendall Rojano Orozco', email: 'kendallrojano@redboston.edu.co', group: '8th Blue' },
  { name: 'Samuel Sabalza Bermudez', email: 'samuelsabalza@redboston.edu.co', group: '8th Blue' },
  { name: 'Emanuel Sierra Sierra', email: 'eesierra@redboston.edu.co', group: '8th Blue' },

  // 8th Red
  { name: 'Alejandra Alvarez Gonzalez', email: 'alejandraalvarez@redboston.edu.co', group: '8th Red' },
  { name: 'Sofia Arevalo Mindiola', email: 'sofiaarevalomin@redboston.edu.co', group: '8th Red' },
  { name: 'Victoria Ariza Salas', email: 'victorias@redboston.edu.co', group: '8th Red' },
  { name: 'Jose Manuel Castellon Ensuncho', email: 'josecastellon@redboston.edu.co', group: '8th Red' },
  { name: 'Andres Chima Maestre', email: 'andreschima@redboston.edu.co', group: '8th Red' },
  { name: 'Cristina Contreras Rada', email: 'cristinacontreras@redboston.edu.co', group: '8th Red' },
  { name: 'Susan Gabriela Crespo Ricardo', email: 'susancrespo@redboston.edu.co', group: '8th Red' },
  { name: 'Vivian Naomy Gil Gomez', email: 'viviangil@redboston.edu.co', group: '8th Red' },
  { name: 'Andres Camilo Gonzalez Restrepo', email: 'andresgonzalez@redboston.edu.co', group: '8th Red' },
  { name: 'Nicolle Manosalva Yali', email: 'nicolemanosalva@redboston.edu.co', group: '8th Red' },
  { name: 'Valentino Martinez Castro', email: 'valentinomartinez@redboston.edu.co', group: '8th Red' },
  { name: 'Sara Meza Yepes', email: 'sarameza@redboston.edu.co', group: '8th Red' },
  { name: 'Juan Sebastian Ortiz Vidal', email: 'juanseortiz@redboston.edu.co', group: '8th Red' },
  { name: 'Mateo Raul Pachon Tapias', email: 'mateopachon@redboston.edu.co', group: '8th Red' },
  { name: 'Mariana Pareja Pedraza', email: 'marianapareja@redboston.edu.co', group: '8th Red' },
  { name: 'Moises Pomarico Casdiego', email: 'moisespomarico@redboston.edu.co', group: '8th Red' },
  { name: 'Santiago Porto Rangel', email: 'santiagoporto@redboston.edu.co', group: '8th Red' },
  { name: 'Isabel Sofia Pua Muñoz', email: 'isabelpua@redboston.edu.co', group: '8th Red' },
  { name: 'Maryann Renteria Prens', email: 'maryannrenteria@redboston.edu.co', group: '8th Red' },
  { name: 'Juan Esteban Romero Orozco', email: 'juanesromero@redboston.edu.co', group: '8th Red' },
  { name: 'Danna Sarmiento Gonzalez', email: 'dannasarmiento@redboston.edu.co', group: '8th Red' },

  // Teacher
  { name: 'Edoardo Ortiz', email: 'edoardoortiz@redboston.edu.co', group: 'Teacher' },
];

export const findStudentByEmail = (email: string): Student | undefined =>
  students.find(s => s.email.toLowerCase() === email.toLowerCase().trim());
