import '@/styles/globals.css';
import cookie from 'cookie';
import * as React from 'react';
import type { IncomingMessage } from 'http';
import type { AppProps, AppContext } from 'next/app';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak-fork/ssr';
import {
  motion, AnimatePresence, useScroll, useSpring,
} from 'framer-motion';
import { useRouter } from 'next/router';
import Header from '@/components/header';
import { useEffect } from 'react';
import { EmotionCache } from '@emotion/react';
import PageProvider from '@/src/helpers/PageProvider';

const keycloakCfg = {
  url: 'http://localhost:8888/auth/',
  realm: 'nextjs',
  clientId: 'react-client',
};

export interface MUIAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

interface InitialProps {
  cookies: unknown;
}

function MyApp({
  Component,
  pageProps,
  cookies,
  router
}: AppProps & InitialProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
    >
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={{
            hidden: { opacity: 0, x: -200, y: 0 },
            enter: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: 0, y: -100 },
          }}
          transition={{ type: 'linear' }}
          className="
                flex flex-col items-start w-full pt-10
                px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96
                pt-24 h-full
            "
        >
          <PageProvider>
            <Component {...pageProps} key={router.route}/>
          </PageProvider>
        </motion.main>
        <motion.div className="progress-bar" style={{ scaleX }} />
      </AnimatePresence>
    </SSRKeycloakProvider>
  );
}

function parseCookies(req: IncomingMessage) {
  return cookie.parse(req.headers.cookie || '');
}

MyApp.getStaticProps = async (context: AppContext) => ({
  cookies: context.ctx.req ? parseCookies(context.ctx.req) : {},
});

export default MyApp;
