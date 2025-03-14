import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Icon({ name, size = 16, }:{name:string, size?: number,}){
    return (
        <>
            <i className={`bi bi-${name}`} style={{ fontSize: size }}></i>
        </>
    );
};