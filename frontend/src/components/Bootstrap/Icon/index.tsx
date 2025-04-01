import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Icon({ name, size = 16, leftLabel, rightLabel}:{name:string, size?: number, leftLabel?: string, rightLabel?:string}){
    return (
        <>
            {leftLabel && (
                <>
                    <small>
                        {leftLabel}
                    </small> 
                    &nbsp;&nbsp;
                </>
            )}
            <i className={`${name}`} style={{ fontSize: size }}></i>
            {rightLabel && (
                <>
                    &nbsp;&nbsp;
                    <small>
                        {rightLabel}
                    </small> 
                </>
            )}
        </>
    );
};