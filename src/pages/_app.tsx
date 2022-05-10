import React, { useEffect } from 'react';
import 'src/styles/global.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalsProvider from 'src/components/ui/organisms/modals';
import SuperTokens from 'supertokens-auth-react';
import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import Session from 'supertokens-auth-react/recipe/Session';

if (typeof window !== 'undefined') {
  console.log('hello', process.env.NEXT_PUBLIC_APP_NAME);
  SuperTokens.init({
    appInfo: {
      appName: process.env.NEXT_PUBLIC_APP_NAME,
      apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN,
      websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
    },
    recipeList: [
      ThirdPartyPasswordless.init({
        signInUpFeature: {
          providers: [
            ThirdPartyPasswordless.Github.init(),
            ThirdPartyPasswordless.Google.init(),
            ThirdPartyPasswordless.Apple.init(),
          ],
        },
        contactMethod: 'EMAIL',
      }),
      Session.init(),
    ],
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'default');
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </ModalsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
