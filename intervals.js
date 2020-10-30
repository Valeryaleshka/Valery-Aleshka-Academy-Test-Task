function intervalConstruction(arr) {
  if (arr.length > 3) {
    throw new Error("Illegal number of elements in input array");
  }

  const semitonesByNote = new Map([
    ["C", 2],
    ["D", 2],
    ["E", 1],
    ["F", 2],
    ["G", 2],
    ["A", 2],
    ["B", 1],
  ]);

  const intervalSemitones = new Map([
    ["m2", 1],
    ["M2", 2],
    ["m3", 3],
    ["M3", 4],
    ["P4", 5],
    ["P5", 7],
    ["m6", 8],
    ["M6", 9],
    ["m7", 10],
    ["M7", 11],
    ["P8", 12],
  ]);

  const degreeNotes = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ];

  let final;
  let finalNote;
  let temp;
  let direction = arr.length < 3 ? "dsc" : arr[2];
  let first = findnote(degreeNotes, arr[1][0], direction);
  let currentSemitones = intervalSemitones.get(arr[0]);
  let semitoneNumber = 0;

  setCurrentSemitones();

  if (direction === "asc") {
    final = first + parseInt(arr[0][1] - 1);
    finalNote = degreeNotes[first + parseInt(arr[0][1] - 1)];
  } else {
    final = first - parseInt(arr[0][1] - 1);
    finalNote = degreeNotes[first - parseInt(arr[0][1] - 1)];
  }

  if (direction === "dsc") {
    temp = final;
    final = first;
    first = temp;
  }

  let newArr = degreeNotes.slice(first, final);

  newArr.forEach((element) => {
    semitoneNumber += semitonesByNote.get(element);
  });

  addSharpFlat();

  return finalNote;

  function addSharpFlat() {
    if (direction === "asc") {
      if (semitoneNumber < currentSemitones) {
        semitoneNumber++;
        finalNote = finalNote.concat("#");
        addSharpFlat();
      }
      if (semitoneNumber > currentSemitones) {
        semitoneNumber--;
        finalNote = finalNote.concat("b");
        addSharpFlat();
      }
    } else {
      if (semitoneNumber > currentSemitones) {
        semitoneNumber--;
        finalNote = finalNote.concat("#");
        addSharpFlat();
      }
      if (semitoneNumber < currentSemitones) {
        semitoneNumber++;
        finalNote = finalNote.concat("b");
        addSharpFlat();
      }
    }
  }

  function findnote(arr, note, direction) {
    if (direction === "asc") {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === note) {
          return i;
        }
      }
    } else {
      for (let i = arr.length; i > 0; i--) {
        if (arr[i] === note) {
          return i;
        }
      }
    }
  }

  function setCurrentSemitones() {
    if (arr[1].length > 1) {
      for (var i = 0; i < arr[1].length; i++) {
        let element = arr[1].charAt(i);

        if (element === "#" && direction === "asc") {
          currentSemitones++;
        }
        if (element === "#" && direction === "dsc") {
          currentSemitones--;
        }
        if (element === "b" && direction === "asc") {
          currentSemitones--;
        }
        if (element === "b" && direction === "dsc") {
          currentSemitones++;
        }
      }
    }
  }
}

function intervalIdentification(arr) {
  if (arr.length > 3) {
    throw new Error("Illegal number of elements in input array");
  }

  if (arr[0] === arr[1]) {
    return "P8";
  }
  const semitonesByNote = new Map([
    ["C", 2],
    ["D", 2],
    ["E", 1],
    ["F", 2],
    ["G", 2],
    ["A", 2],
    ["B", 1],
  ]);

  const intervalSemitones = new Map([
    ["m2", 1],
    ["M2", 2],
    ["m3", 3],
    ["M3", 4],
    ["P4", 5],
    ["P5", 7],
    ["m6", 8],
    ["M6", 9],
    ["m7", 10],
    ["M7", 11],
    ["P8", 12],
  ]);

  const degreeNotes = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ];

  let semitoneNumber = 0;
  let direction = arr.length < 3 ? "asc" : arr[2];
  let first = direction === "dsc" ? arr[1] : arr[0];
  let second = direction === "dsc" ? arr[0] : arr[1];

  let degreeNotesTemp = degreeNotes.slice(
    findnote(degreeNotes, first[0], "asc")
  );
  degreeNotesTemp = degreeNotesTemp.slice(
    0,
    findnote(degreeNotesTemp, second[0], "asc")
  );

  degreeNotesTemp.forEach((element) => {
    semitoneNumber += semitonesByNote.get(element);
  });

  setCurrentSemitones(first, second);

  return getByValue(intervalSemitones, semitoneNumber);

  function findnote(arr, note, direction) {
    if (direction === "asc") {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === note) {
          return i;
        }
      }
    } else {
      for (let i = arr.length; i > 0; i--) {
        if (arr[i] === note) {
          return i;
        }
      }
    }
  }

  function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue) return key;
    }
  }

  function setCurrentSemitones(firstNote, secondNote) {
    if (firstNote.length > 1) {
      for (let i = 0; i < firstNote.length; i++) {
        let element = firstNote.charAt(i);

        if (element === "#") {
          semitoneNumber--;
        }

        if (element === "b") {
          semitoneNumber++;
        }
      }
    }

    if (secondNote.length > 1) {
      for (let i = 0; i < secondNote.length; i++) {
        let element = secondNote.charAt(i);

        if (element === "#") {
          semitoneNumber++;
        }

        if (element === "b") {
          semitoneNumber--;
        }
      }
    }
  }
}