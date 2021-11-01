import React from "react";
import styled from "styled-components";

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
    background-color: ${props =>theme[props.theme].default};
    border-radius: 20px;
    outline: 0;
    padding: 15px 25px;
    text-transform: uppercase;
    color:white;
`
Button.defaultProps = {
    theme: 'blue'
};

function clickMe() {
    alert("You clicked me!");
}

export default function App() {
    return (
        <>
            <div>
                <Button theme='blue' onClick={clickMe}>
                    A
                </Button>
            </div>
            <div>
                <Button theme="blue" onClick={clickMe}>
                    C
                </Button>
            </div>
            <div>
                <Button theme="blue" onClick={clickMe}>
                    E
                </Button>
            </div>
            <div>
                <Button theme="orange" onClick={clickMe}>
                    B
                </Button>
            </div>
            <div>
                <Button theme="orange" onClick={clickMe}>
                    D
                </Button>
            </div>
            <div>
                <Button theme="orange" onClick={clickMe}>
                    F
                </Button>
            </div>
            <div>
                <Button theme="orange" onClick={clickMe}>
                    [F]
                </Button>
            </div>
            <div>
                <Button theme="orange" onClick={clickMe}>
                    M
                </Button>
            </div>
            <div>
                <Button theme="green" onClick={clickMe}>
                    G
                </Button>
            </div>
            <div>
                <Button theme="grey" onClick={clickMe}>
                    L
                </Button>
            </div>
            <div>
                <Button theme="brown" onClick={clickMe}>
                    J
                </Button>
            </div>
            <div>
                <Button theme="brown" onClick={clickMe}>
                    Z
                </Button>
            </div>
            <div>
                <Button theme="yellow" onClick={clickMe}>
                    N
                </Button>
            </div>
            <div>
                <Button theme="yellow" onClick={clickMe}>
                    Q
                </Button>
            </div>
            <div>
                <Button theme="yellow" onClick={clickMe}>
                    R
                </Button>
            </div>
            <div>
                <Button theme="yellow" onClick={clickMe}>
                    W
                </Button>
            </div>
            <div>
                <Button theme="red" onClick={clickMe}>
                    1
                </Button>
            </div>
            <div>
                <Button theme="red" onClick={clickMe}>
                    2
                </Button>
            </div>
            <div>
                <Button theme="red" onClick={clickMe}>
                    3
                </Button>
            </div>
            <div>
                <Button theme="darkgreen" onClick={clickMe}>
                    4
                </Button>
            </div>
            <div>
                <Button theme="darkgreen" onClick={clickMe}>
                    5
                </Button>
            </div>
            <div>
                <Button theme="darkgreen" onClick={clickMe}>
                    6
                </Button>
            </div>
            <div>
                <Button theme="darkgreen" onClick={clickMe}>
                    [6]
                </Button>
            </div>
            <div>
                <Button theme="purple" onClick={clickMe}>
                    7
                </Button>
            </div>
            <div>
                <Button theme="purple" onClick={clickMe}>
                    [7]
                </Button>
            </div>
            <div>
                <Button theme="teal" onClick={clickMe}>
                    T
                </Button>
            </div>
            <div>
                <Button theme="shuttle" onClick={clickMe}>
                    S
                </Button>
            </div>
        </>
    ) ;
}