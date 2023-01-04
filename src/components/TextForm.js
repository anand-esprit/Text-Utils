import React, {useState} from 'react'

export default function TextForm(props) {

    const textDefault = {
        value: '',
        words: 0,
        characters: 0
    };

    const [text, setText] = useState(textDefault);

    const handleOnChange = (e) => {
        let val = e.target.value;
        let newText = {value: val, words: val.length && val.trimEnd("").split(" ").length, characters: val.length}
        setText(newText);
    }

    const handleUpClick = () => {
        let newText = {value: text.value.toUpperCase()}
        setText(text => ({
            ...text,
            ...newText
        }));
    }

    const handleLoClick = () => {
        let newText = {value: text.value.toLowerCase()}
        setText(text => ({
            ...text,
            ...newText
        }));
    }

    const handleClearClick = () => {
        setText(textDefault);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text.value); 
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpaces = () => {
        let val = text.value.split(/[ ]+/).join(" ");
        let newText = {value: val, characters: val.length}
        setText(text => ({
            ...text,
            ...newText
        }));
        // props.showAlert("Extra spaces removed!", "success");
    }

    return (
        <>
            <div className='container' style={{color: props.mode==='dark'?'white':'#042743'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">                    
                    <textarea className="form-control" value={text.value} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>
            <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
                <h2> Your Text Summary </h2>
                <p> {text.words} words and {text.characters} characters </p>
                <h2> Preview </h2>
                <p> {text.value} </p>
                <h3>{ 0.00099 * (text?.value?.length ?? 0) } Minutes to read</h3>
            </div>
        </>
    )
}
