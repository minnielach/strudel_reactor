function PreprocessTextarea ({ value, onChange }) {
    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea className="form-control" rows="15" value={value} onChange={onChange} id="proc" ></textarea>
        </>
    );
}

export default PreprocessTextarea;