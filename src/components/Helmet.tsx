//@ts-ignore
import { Helmet } from 'react-helmet';

const MyComponent = () => {
    return (
        <div>
            <Helmet>
                <title>Hubz Onchain Chat Analytics</title>
                <meta name="description" content="Hubz-enabled Telegram chat group admins can access a wealth of onchain data about their users with Hubz Analytics. Get started for free simply by logging in with your Telegram credentials." />
                {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
            </Helmet>
            {/* Your component content */}
        </div>
    );
};

export default MyComponent;
