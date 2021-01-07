import React from 'react';
import SectionTitle from './drawer/SectionTitle';

import styles from './styles/Metadata.module.css';

export default function Grpcurl() {
    return(
        <div className={styles.wrapper}>
            <SectionTitle title="gRPCurl" />
            <textarea readOnly>Here is some text</textarea>
        </div>
    );
}