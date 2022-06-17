import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Store } from '../utils/Store';

export default function Shipping() {
  const router = useRouter();
  const { state } = React.useContext(Store);
  const { userInfo } = state;

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return <div>Shipping</div>;
  }
}
