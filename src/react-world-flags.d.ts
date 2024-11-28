declare module 'react-world-flags' {
    import React from 'react';

    interface FlagProps {
        code: string;
        style?: React.CSSProperties;
    }

    const Flag: React.FC<FlagProps>;

    export default Flag;
}