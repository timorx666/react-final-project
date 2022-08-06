const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input name={name} id={name} className="form-control" {...rest}/>
            {error && <span className="text-danger">{error}</span>}
        </div>
    );
}

export default Input;