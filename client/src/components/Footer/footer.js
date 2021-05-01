import {BiCopyright} from 'react-icons/bi'

function footer() {
    return (
        <div className="footer">
            <p  className="text-center">Copyrights <BiCopyright /> joDev {new Date().getFullYear()}</p>
        </div>
    )
}

export default footer
