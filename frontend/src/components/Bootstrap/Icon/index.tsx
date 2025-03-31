import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Icon({ name, size = 16, labelLeft, labelRight}:{name:string, size?: number, labelLeft?: string, labelRight?:string}){
    return (
        <>
            {labelLeft && (
                <>
                    <small className="text-muted">
                        {labelLeft}
                    </small> 
                    &nbsp;&nbsp;
                </>
            )}
            <i className={`${name}`} style={{ fontSize: size }}></i>
            {labelRight && (
                <>
                    &nbsp;&nbsp;
                    <small className="text-muted">
                        {labelRight}
                    </small> 
                </>
            )}
        </>
    );
};