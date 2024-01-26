import Typo from "./typo";


interface typoRange {
    line: number;
    startIdx: number;
    endIdx: number;
}
interface SpellingMistake {
    range: typoRange;
    original: string;
    advices: string[];
}
const fetchData = async (path: string) => {    
      const response = await fetch(path);
      const data = await response.text();
      return data;
  };
const checkSpelling_typo = async (md: string) => {
    const dataaff = await fetchData('/dictionaries/ru_RU/ru_RU.aff');
    const datadic = await fetchData('/dictionaries/ru_RU/ru_RU.dic');

    var dictionary = new Typo(
        '*какая-то заглушка',
        dataaff,
        datadic
    );

    var spellingMistakes: SpellingMistake[] = [];
    let lines: string[] = md.split("\n");

    for (var il = 0; il < lines.length; il++) {
        let words: string[] = lines[il].split(/[ .,/#!$%^&*;:{}=\-_`~+?()\r\\]/);
        let Idx = 0;
        for (var word of words) {
            if (word.length > 2) {
                if (!dictionary.check(word)) {
                    spellingMistakes.push({
                        range: {
                            line: il,
                            startIdx: Idx,
                            endIdx: Idx + word.length - 1
                        },
                        original: word,
                        advices: dictionary.suggest(word)
                    });
                }
            }
            Idx += word.length + 1;
        }
    }
    return spellingMistakes;
}

interface PartOfContent {
    content: string
    advices?: string[];
}
export type { PartOfContent };

const getPartsOfContent = (
    md: string,
    spellingMistakes: SpellingMistake[]
): PartOfContent[] => {
    var partOfContent: PartOfContent[] = [];
    let lines: string[] = md.split("\n");
    let start = 0;
    let line = 0;

    for (var spellingMistake of spellingMistakes) {
        while (line !== spellingMistake.range.line) {
            partOfContent.push({
                content: lines[line++].substring(start) + "\n"
            });            
            start = 0;
        } 
        partOfContent.push({
            content: lines[line].substring(start, spellingMistake.range.startIdx)
        });
        start = spellingMistake.range.endIdx + 1;
        partOfContent.push({
        content: spellingMistake.original,
        advices: spellingMistake.advices
        });
    }
    while (line !== lines.length) {
        partOfContent.push({
            content: lines[line++].substring(start) + "\n"
        });            
        start = 0;
    } 
    return partOfContent;
}


const partsOfContent = async (md: string): Promise<PartOfContent[]> =>
{
    //md = await fetchData('text.txt');
    const spellingMistakes: SpellingMistake[] = //await checkSpelling_typo(md);
    [
        {
            "range": {
                "line": 4,
                "startIdx": 3,
                "endIdx": 8
            },
            "original": "<https",
            "advices": []
        },
        {
            "range": {
                "line": 4,
                "startIdx": 12,
                "endIdx": 14
            },
            "original": "www",
            "advices": []
        },
        {
            "range": {
                "line": 4,
                "startIdx": 16,
                "endIdx": 22
            },
            "original": "youtube",
            "advices": []
        },
        {
            "range": {
                "line": 4,
                "startIdx": 24,
                "endIdx": 26
            },
            "original": "com",
            "advices": []
        },
        {
            "range": {
                "line": 4,
                "startIdx": 28,
                "endIdx": 32
            },
            "original": "watch",
            "advices": []
        },
        {
            "range": {
                "line": 4,
                "startIdx": 36,
                "endIdx": 47
            },
            "original": "ftnVllssoI8>",
            "advices": []
        },
        {
            "range": {
                "line": 6,
                "startIdx": 3,
                "endIdx": 8
            },
            "original": "Gramax",
            "advices": []
        },
        {
            "range": {
                "line": 6,
                "startIdx": 11,
                "endIdx": 13
            },
            "original": "git",
            "advices": []
        },
        {
            "range": {
                "line": 6,
                "startIdx": 19,
                "endIdx": 31
            },
            "original": "нетехнических",
            "advices": [
                "геотехнических",
                "Геотехнических",
                "технических"
            ]
        },
        {
            "range": {
                "line": 7,
                "startIdx": 33,
                "endIdx": 35
            },
            "original": "нём",
            "advices": [
                "нм",
                "нам",
                "нем",
                "ним",
                "ном"
            ]
        },
        {
            "range": {
                "line": 7,
                "startIdx": 50,
                "endIdx": 52
            },
            "original": "git",
            "advices": []
        },
        {
            "range": {
                "line": 10,
                "startIdx": 3,
                "endIdx": 10
            },
            "original": "Осноaной",
            "advices": [
                "Основной",
                "Основой",
                "Основней",
                "Основно",
                "Основное"
            ]
        },
        {
            "range": {
                "line": 10,
                "startIdx": 20,
                "endIdx": 25
            },
            "original": "лёгкое",
            "advices": [
                "легкое",
                "левкое",
                "легкие",
                "легко",
                "Легкое"
            ]
        },
        {
            "range": {
                "line": 10,
                "startIdx": 36,
                "endIdx": 41
            },
            "original": "праqок",
            "advices": [
                "правок",
                "парок",
                "арабок",
                "Арабок",
                "арапок"
            ]
        },
        {
            "range": {
                "line": 10,
                "startIdx": 44,
                "endIdx": 48
            },
            "original": "ревью",
            "advices": [
                "Цевью",
                "ревю",
                "ревою",
                "резью",
                "релью"
            ]
        },
        {
            "range": {
                "line": 10,
                "startIdx": 72,
                "endIdx": 82
            },
            "original": "бренчевание",
            "advices": [
                "бренчание"
            ]
        },
        {
            "range": {
                "line": 12,
                "startIdx": 3,
                "endIdx": 8
            },
            "original": "Gitlab",
            "advices": []
        },
        {
            "range": {
                "line": 12,
                "startIdx": 12,
                "endIdx": 17
            },
            "original": "VSCode",
            "advices": []
        },
        {
            "range": {
                "line": 12,
                "startIdx": 26,
                "endIdx": 29
            },
            "original": "Docs",
            "advices": []
        },
        {
            "range": {
                "line": 12,
                "startIdx": 34,
                "endIdx": 37
            },
            "original": "code",
            "advices": []
        },
        {
            "range": {
                "line": 13,
                "startIdx": 36,
                "endIdx": 41
            },
            "original": "соsать",
            "advices": [
                "совать",
                "сосать",
                "сдать",
                "сжать",
                "слать"
            ]
        },
        {
            "range": {
                "line": 13,
                "startIdx": 48,
                "endIdx": 51
            },
            "original": "docs",
            "advices": []
        },
        {
            "range": {
                "line": 13,
                "startIdx": 56,
                "endIdx": 59
            },
            "original": "code",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 6,
                "endIdx": 11
            },
            "original": "<https",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 15,
                "endIdx": 17
            },
            "original": "www",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 19,
                "endIdx": 25
            },
            "original": "youtube",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 27,
                "endIdx": 29
            },
            "original": "com",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 31,
                "endIdx": 35
            },
            "original": "watch",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 39,
                "endIdx": 49
            },
            "original": "QqgaX8JFyB8",
            "advices": []
        },
        {
            "range": {
                "line": 15,
                "startIdx": 53,
                "endIdx": 57
            },
            "original": "157s>",
            "advices": []
        },
        {
            "range": {
                "line": 17,
                "startIdx": 6,
                "endIdx": 11
            },
            "original": "<https",
            "advices": []
        },
        {
            "range": {
                "line": 17,
                "startIdx": 15,
                "endIdx": 19
            },
            "original": "vimeo",
            "advices": []
        },
        {
            "range": {
                "line": 17,
                "startIdx": 21,
                "endIdx": 23
            },
            "original": "com",
            "advices": []
        },
        {
            "range": {
                "line": 17,
                "startIdx": 25,
                "endIdx": 34
            },
            "original": "583642755>",
            "advices": []
        },
        {
            "range": {
                "line": 19,
                "startIdx": 0,
                "endIdx": 4
            },
            "original": "Темы2",
            "advices": [
                "Темы",
                "Гемы",
                "Немы",
                "Ремы",
                "Семы"
            ]
        },
        {
            "range": {
                "line": 21,
                "startIdx": 16,
                "endIdx": 18
            },
            "original": "Git",
            "advices": []
        },
        {
            "range": {
                "line": 23,
                "startIdx": 3,
                "endIdx": 5
            },
            "original": "Git",
            "advices": []
        },
        {
            "range": {
                "line": 23,
                "startIdx": 105,
                "endIdx": 108
            },
            "original": "Docs",
            "advices": []
        },
        {
            "range": {
                "line": 23,
                "startIdx": 113,
                "endIdx": 116
            },
            "original": "Code",
            "advices": []
        },
        {
            "range": {
                "line": 24,
                "startIdx": 24,
                "endIdx": 32
            },
            "original": "писeтелям",
            "advices": [
                "писателям",
                "описателям",
                "Описателям",
                "пастелям",
                "писателем"
            ]
        },
        {
            "range": {
                "line": 24,
                "startIdx": 54,
                "endIdx": 61
            },
            "original": "рабqтали",
            "advices": [
                "работали",
                "работал",
                "работала",
                "Работали",
                "работало"
            ]
        },
        {
            "range": {
                "line": 24,
                "startIdx": 65,
                "endIdx": 67
            },
            "original": "Git",
            "advices": []
        },
        {
            "range": {
                "line": 24,
                "startIdx": 174,
                "endIdx": 176
            },
            "original": "DaC",
            "advices": []
        },
        {
            "range": {
                "line": 26,
                "startIdx": 3,
                "endIdx": 11
            },
            "original": "Онбординг",
            "advices": []
        },
        {
            "range": {
                "line": 26,
                "startIdx": 15,
                "endIdx": 18
            },
            "original": "Docs",
            "advices": []
        },
        {
            "range": {
                "line": 26,
                "startIdx": 23,
                "endIdx": 26
            },
            "original": "Code",
            "advices": []
        },
        {
            "range": {
                "line": 27,
                "startIdx": 27,
                "endIdx": 29
            },
            "original": "DaC",
            "advices": []
        },
        {
            "range": {
                "line": 27,
                "startIdx": 50,
                "endIdx": 58
            },
            "original": "онбординг",
            "advices": []
        },
        {
            "range": {
                "line": 27,
                "startIdx": 274,
                "endIdx": 281
            },
            "original": "опенсурс",
            "advices": []
        },
        {
            "range": {
                "line": 27,
                "startIdx": 311,
                "endIdx": 316
            },
            "original": "Gramax",
            "advices": []
        },
        {
            "range": {
                "line": 29,
                "startIdx": 16,
                "endIdx": 23
            },
            "original": "“Мqтрики",
            "advices": [
                "Метрики"
            ]
        },
        {
            "range": {
                "line": 29,
                "startIdx": 25,
                "endIdx": 37
            },
            "original": "документации”",
            "advices": [
                "документации",
                "Документации",
                "документаций",
                "документацию",
                "документация"
            ]
        },
        {
            "range": {
                "line": 32,
                "startIdx": 4,
                "endIdx": 15
            },
            "original": "фывфывфывфыв",
            "advices": []
        }
    ]
    return getPartsOfContent(md, spellingMistakes);
}

export default partsOfContent
