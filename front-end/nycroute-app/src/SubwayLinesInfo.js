import React from 'react';
import styled from 'styled-components';

const theme = {
    blue:{
        default: '#0d47a1'
    },
    orange:{
        default: '#ff5722'
    },
    green:{
        default: '#aeea00'
    },
    grey:{
        default: '#bdbdbd'
    },
    brown:{
        default: '#795548'
    },
    yellow:{
        default: '#fdd835'
    },
    red:{
        default: '#f44336'
    },
    darkgreen:{
        default: '#2e7d32'
    },
    purple:{
        default: '#ab47bc'
    },
    teal:{
        default: '#00acc1'
    },
    shuttle:{
        default: '#9e9e9e'
    }
}

const Button = styled.button`
    border-radius: 10px;
    outline: 0;
    padding: 15px 25px;
    text-transform: uppercase;
    color:white;
`
Button.defaultProps = {
    theme: "blue"
};

export default function App() {
    return (
        <>
            <div>
                <button theme="blue" lineA={clickMe}>
                    A
                </button>
            </div>
            <div>
                <button theme="blue" lineC={clickMe}>
                    C
                </button>
            </div>
            <div>
                <button theme="blue" lineE={clickMe}>
                    E
                </button>
            </div>
            <div>
                <button theme="orange" lineB={clickMe}>
                    B
                </button>
            </div>
            <div>
                <button theme="orange" lineD={clickMe}>
                    D
                </button>
            </div>
            <div>
                <button theme="orange" lineF={clickMe}>
                    F
                </button>
            </div>
            <div>
                <button theme="orange" lineFbox={clickMe}>
                    [F]
                </button>
            </div>
            <div>
                <button theme="orange" lineM={clickMe}>
                    M
                </button>
            </div>
            <div>
                <button theme="green" lineG={clickMe}>
                    G
                </button>
            </div>
            <div>
                <button theme="grey" lineL={clickMe}>
                    L
                </button>
            </div>
            <div>
                <button theme="brown" lineJ={clickMe}>
                    J
                </button>
            </div>
            <div>
                <button theme="brown" lineZ={clickMe}>
                    Z
                </button>
            </div>
            <div>
                <button theme="yellow" lineN={clickMe}>
                    N
                </button>
            </div>
            <div>
                <button theme="yellow" lineQ={clickMe}>
                    Q
                </button>
            </div>
            <div>
                <button theme="yellow" lineR={clickMe}>
                    R
                </button>
            </div>
            <div>
                <button theme="yellow" lineW={clickMe}>
                    W
                </button>
            </div>
            <div>
                <button theme="red" line1={clickMe}>
                    1
                </button>
            </div>
            <div>
                <button theme="red" line2={clickMe}>
                    2
                </button>
            </div>
            <div>
                <button theme="red" line3={clickMe}>
                    3
                </button>
            </div>
            <div>
                <button theme="darkgreen" line4={clickMe}>
                    4
                </button>
            </div>
            <div>
                <button theme="darkgreen" line5={clickMe}>
                    5
                </button>
            </div>
            <div>
                <button theme="darkgreen" line6={clickMe}>
                    6
                </button>
            </div>
            <div>
                <button theme="darkgreen" line6box={clickMe}>
                    [6]
                </button>
            </div>
            <div>
                <button theme="purple" line7={clickMe}>
                    7
                </button>
            </div>
            <div>
                <button theme="purple" line7box={clickMe}>
                    [7]
                </button>
            </div>
            <div>
                <button theme="teal" lineT={clickMe}>
                    T
                </button>
            </div>
            <div>
                <button theme="shuttle" lineS={clickMe}>
                    S
                </button>
            </div>
        </>
    ) ;
}

