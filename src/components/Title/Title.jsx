import './Title.css';

function Title({name, text}) {
    return (
        <>
            <h2 className="title-name">{name}</h2>
            <p className="title-text">
                {text.split('\n').map((line, i) => (
                    <span key={i}>
            {line}
                        <br/>
          </span>
                ))}
            </p>
        </>
    )
}

export default Title;