import {
    div,
    span,
    nav,
    ul,
    li,
    strong,
    a,
    h3,
    p,
    img,
    button,
    setStyle
} from '../helper'
const TextBracket = class {
    constructor({
        selector
    }) {
        if (!selector) return;
        this.selector = selector;
        const {
            keywords = [], duration = 4000
        } = this.selector.dataset;
        this.duration = duration;
        this.words = keywords.split(",");

        this.current = 0;
        this.createNode();
    }
    createNode() {
        const bracket = div.cloneNode();
        const before = h3.cloneNode();
        const after = h3.cloneNode();
        const wordWrap = div.cloneNode();
        this.wordWrap = wordWrap;
        const word = h3.cloneNode();
        word.className = 'color-primary'

        before.className = 'color-primary bold mr-10'
        after.className = 'color-primary bold ml-10'

        setStyle(word, {
            display: 'inline-flex',
            justifyContent: 'center',
            textTransform: 'uppercase',
            fontWeight: '600',
        })

        setStyle(bracket, {
            display: "inline-flex"
        });

        setStyle(wordWrap, {
            display: "flex",
            overflow: 'hidden',
        });

        before.innerHTML = "[";
        after.innerHTML = "]";

        bracket.append(before, wordWrap, after);

        let maxWidth = 0;
        let maxHeight = 0;
        this.wordsSelector = this.words.map(textWord => {
            const _word = word.cloneNode(true);
            _word.innerHTML = textWord;
            return _word;
        });
        const wordSlider = div.cloneNode()
        setStyle(wordSlider, {
            display: 'flex',
            flexDirection: 'column',
            transition: '0.4s'
        })
        wordSlider.append(...this.wordsSelector)
        this.wordWrap.append(wordSlider);

        this.selector.append(bracket);

        this.maxWidth = `${wordSlider.offsetWidth}px`
        this.maxHeight = this.wordsSelector[0].offsetHeight
        setStyle(this.wordWrap, {
            width: this.maxWidth,
            height: `${this.maxHeight}px`,
            position: "relative",
        });
        setStyle(wordSlider, {
            position: 'absolute',
            top: 0,
            left: 0,
        })
        this.wordSlider = wordSlider
        this.update();
    }
    update() {
        setStyle(this.wordSlider, {
            transform: `translateY(-${this.current * this.maxHeight}px)`
        })
        this.current =
            this.current >= this.wordsSelector.length - 1 ? 0 : this.current + 1;

        setTimeout(() => this.update(), this.duration);
    }
};
const textBracket = document.querySelector(".text-bracket");
new TextBracket({
    selector: textBracket
});