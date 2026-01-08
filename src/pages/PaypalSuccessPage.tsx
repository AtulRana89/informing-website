import axios, { AxiosError } from 'axios';
import { CheckCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Define TypeScript interfaces
interface UserDetails {
    _id: string;
    personalName: string;
    familyName: string;
    email: string;
    membershipType: string;
    membershipStatus: string;
    subscriptionStatus?: string;
}

interface ApiResponse {
    success: boolean;
    user?: UserDetails;
    subscriptionId?: string;
    message?: string;
}

interface QueryParams {
    userId: string | null;
    subscriptionId: string | null;
    status: string | null;
    token: string | null;
}

function PaypalSuccessPage(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [subscriptionId, setSubscriptionId] = useState<string>('');
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const queryParams: QueryParams = {
            userId: new URLSearchParams(location.search).get('userId'),
            subscriptionId: new URLSearchParams(location.search).get('subscriptionId'),
            status: new URLSearchParams(location.search).get('status'),
            token: new URLSearchParams(location.search).get('token')
        };

        console.log('PayPal Success Page Params:', queryParams);

        if (queryParams.subscriptionId) {
            setSubscriptionId(queryParams.subscriptionId);
        }

        // Call API to verify and update subscription
        // const verifySubscription = async (): Promise<void> => {
        //     try {
        //         setLoading(true);

        //         // If we have a token from PayPal (for direct payment flow)
        //         if (queryParams.token) {
        //             await axios.post('/api/paypal/capture-payment', {
        //                 token: queryParams.token
        //             });
        //         }

        //         // Determine what to use for verification
        //         const verificationParam = queryParams.subscriptionId || queryParams.userId;

        //         if (!verificationParam) {
        //             throw new Error('No subscription or user ID provided');
        //         }

        //         // // Verify subscription status with backend
        //         // const response = await axios.get<ApiResponse>(
        //         //     `/api/subscriptions/verify/${verificationParam}`
        //         // );

        //         // if (response.data.success) {
        //         //     setMessage('🎉 Welcome to ISI! Your membership has been activated successfully!');

        //         //     if (response.data.user) {
        //         //         setUserDetails(response.data.user);

        //         //         // Update local auth state if user is logged in
        //         //         localStorage.setItem('membershipStatus', 'ACTIVE');
        //         //         localStorage.setItem('userMembershipType', response.data.user.membershipType);
        //         //     }
        //         // } else {
        //         //     setMessage('Payment received! Your membership is being processed...');
        //         // }
        //     } catch (error) {
        //         console.error('Error verifying subscription:', error);

        //         const errorMessage = error instanceof AxiosError
        //             ? error.response?.data?.message || 'Network error occurred'
        //             : error instanceof Error
        //                 ? error.message
        //                 : 'There was an error verifying your payment. Please contact support.';

        //         setError(errorMessage);
        //         setMessage('We received your payment but encountered an issue. Our team has been notified.');
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        if (queryParams.userId || queryParams.subscriptionId) {
            // verifySubscription();
        } else {
            setError('Invalid success URL. Missing subscription information.');
            setLoading(false);
        }
    }, [location]);

    const handleGoToDashboard = (): void => {
        navigate('/dashboard');
    };

    const handleJoinAnother = (): void => {
        navigate('/join-isi');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Processing your membership...</p>
                    <p className="text-sm text-gray-500">This may take a few moments</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                    <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

                        {error ? (
                            <div className="mt-4">
                                <h2 className="text-2xl font-bold text-gray-900">Payment Issue</h2>
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-red-700">{error}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome to ISI!</h2>
                                <p className="mt-2 text-gray-600">{message}</p>

                                {subscriptionId && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                        <p className="text-sm font-medium text-gray-700">Subscription ID:</p>
                                        <p className="text-sm text-gray-600 font-mono break-all">{subscriptionId}</p>
                                    </div>
                                )}

                                {userDetails && (
                                    <div className="mt-4 text-left">
                                        <h3 className="text-lg font-semibold text-gray-900">Your Details:</h3>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Name:</span> {userDetails.personalName} {userDetails.familyName}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Email:</span> {userDetails.email}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Membership:</span> {userDetails.membershipType}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Status:</span> {userDetails.membershipStatus}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                                    <h4 className="text-sm font-semibold text-blue-800">What&apos;s Next?</h4>
                                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                                        <li className="flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            You will receive a confirmation email shortly
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Access all member benefits immediately
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Download your membership certificate
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Join our member-exclusive forums
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleGoToDashboard}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Go to Dashboard
                        </button>

                        <button
                            onClick={handleJoinAnother}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Join Another Member
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Need help?{' '}
                            <Link
                                to="/contact"
                                className="text-blue-600 hover:text-blue-800 font-medium transition duration-150 ease-in-out"
                            >
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaypalSuccessPage;