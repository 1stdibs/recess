import React from 'react';
import Inspector from 'react-inspector';
import styles from './styles/Editor.module.css';

const data = {
    apiType: 'serviceResponse',
    httpCode: 200,
    message: 'OK',
    result: {
        user: {
            id: '1121261',
            profile: {
                apiType: 'profile',
                email: 'rob.richard@1stdibs.com',
                firstName: 'Rob',
                lastName: 'Richard',
                currency: 'USD',
                measurementUnit: 'IN',
                shareBuyerInfo: 'N',
                autoRequestFirstDibsQuote: 'N',
                country: '',
                registrationLocale: 'en-US',
                preferredLocale: 'en-US',
            },
            permissions: {
                apiType: 'permissions',
                permissionList: [
                    {
                        apiType: 'permission',
                        id: 2053,
                        name: 'TAXONOMY_MAPPING',
                        description: 'Taxonomy Mapping',
                        createdDate: '2016-08-23T11:00:00.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1542,
                        name: 'ITEM_IMAGE_UNLOCK',
                        description: 'Permission to edit the locked main image on an item',
                        createdDate: '2015-02-27T15:10:11.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2313,
                        name: 'BULK_REPOST_MP',
                        description:
                            'Allows users to bulk repost inventory to Marketplace from Dealer Inventory Management.',
                        createdDate: '2017-01-05T15:58:15.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1802,
                        name: 'PUB_MERCHANDISING',
                        description:
                            '* User can rearrange listings within a page.  \n* User can move listings to a specific page or end of publication.',
                        createdDate: '2015-11-02T18:29:55.000-05:00',
                        modifiedDate: '2015-11-02T20:32:33.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1552,
                        name: 'MOBILE_PUBLISH_DISCOVER',
                        description:
                            'Permission to publish new discover lists from the Discover CMS.',
                        createdDate: '2015-03-11T18:17:01.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1812,
                        name: 'PUB_TRANSITION_PUBLICATION',
                        description:
                            '* The ability to transition a publication between different workflow states.\n* User can go to Merchandizing Mode.\n* User can preview publication.  \n* User can return to Merchandizing from Preview mode.  \n* User can mark publication "Ready for Publishing".',
                        createdDate: '2015-11-02T18:30:45.000-05:00',
                        modifiedDate: '2016-01-15T13:52:24.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2581,
                        name: 'CREATORS_SUBMIT_PENDING',
                        description:
                            'Gives internal users the ability to submit pending creators from Item Upload.',
                        createdDate: '2018-04-12T10:59:56.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2073,
                        name: 'ELIGIBILITY_DATE_DELAY',
                        description: 'Allows a user to delay listings in Pub Tools',
                        createdDate: '2016-08-25T18:37:41.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1562,
                        name: 'MOBILE_CREATE_DISCOVER',
                        description:
                            'Permission to create/edit Discover Lists, Preview in app, and access tool to do so.',
                        createdDate: '2015-03-11T18:17:55.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1822,
                        name: 'PUB_LISTING_NOTES',
                        description:
                            '* User can bookmark listings.\n* User can create, read, update, and delete listing notes.',
                        createdDate: '2015-11-02T18:32:01.000-05:00',
                        modifiedDate: '2015-11-02T20:32:22.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2083,
                        name: 'HYPERWALLET_ACCOUNT_CREATE',
                        description:
                            'Users can create payout accounts for our Dealers in Hyperwallet.',
                        createdDate: '2016-08-30T11:06:45.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1572,
                        name: 'PROMO_ACCESS',
                        description:
                            'Can see the summary tab of promotions that have been created by direct link.',
                        createdDate: '2015-04-03T15:27:25.000-04:00',
                        modifiedDate: '2017-02-13T10:01:12.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1832,
                        name: 'PUB_RESCHEDULE_LISTINGS',
                        description: 'User can reschedule listings.',
                        createdDate: '2015-11-02T18:33:31.000-05:00',
                        modifiedDate: '2015-12-01T15:31:19.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2601,
                        name: 'SKU_EDIT',
                        description: 'Ability to edit a SKU.',
                        createdDate: '2018-05-04T11:29:55.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2603,
                        name: 'CONVERSATION_STATUS_UPDATE',
                        description: 'For updating the conversation review status',
                        createdDate: '2018-06-27T14:08:43.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2353,
                        name: 'CREATE_TEST_ACCOUNT',
                        description:
                            'Enables the user to create test accounts via the create dealer tool. Will also display the "Create New Dealer" link in the user\'s navigation / dashboard.',
                        createdDate: '2017-02-21T11:41:27.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1842,
                        name: 'PUB_ATTACH_ADDTL_LISTINGS',
                        description:
                            'The ability to attach eligible listings once the publication is in Pending mode.',
                        createdDate: '2015-11-02T18:35:05.000-05:00',
                        modifiedDate: '2015-12-01T15:31:15.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2611,
                        name: 'BUYER_UPDATE_PASSWORD',
                        description:
                            'Reset users password and send out notification email for accounts suspected of ATO activity.',
                        createdDate: '2018-07-19T13:57:27.000-04:00',
                        modifiedDate: '2018-08-01T16:20:48.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2613,
                        name: 'MERCHANDISING_POPULAR_SORT_BLACKLIST',
                        description:
                            'Ability to add items to the Popular Sort black list via the bulk upload tool.',
                        createdDate: '2018-07-19T14:30:02.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1852,
                        name: 'PUB_PUBLISH',
                        description: 'User can publish a publication in the Complete state.',
                        createdDate: '2015-11-02T19:55:00.000-05:00',
                        modifiedDate: '2015-12-01T15:31:13.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1862,
                        name: 'REVIEW_PHOTO_PROCESSING_QUEUE',
                        description:
                            '* User can access the Photo Processing Queue from the Pub Tools Dashboard.\n* User can filter by Review Type, Review Status, Review Assignee, Publication',
                        createdDate: '2015-11-02T20:27:37.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2383,
                        name: 'OPOP_FINAL_WARNING_SET',
                        description:
                            'The ability to add dealers to the OPOP Final Warning whitelist from the Policy & Fees modal in DMT.',
                        createdDate: '2017-06-02T13:26:23.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1872,
                        name: 'REVIEW_DATA_QUEUE',
                        description:
                            '* User can access the Data Review Queue from the Pub Tools Dashboard.\n* User can filter by Review Type, Review Status, Review Assignee, Publication',
                        createdDate: '2015-11-02T20:28:01.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2393,
                        name: 'OPOP_FINAL_WARNING_UNSET',
                        description:
                            'The ability to remove a dealer from the OPOP Final Warning whitelist from the Policy & Fees modal in DMT.',
                        createdDate: '2017-06-02T13:27:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1882,
                        name: 'REVIEW_PHOTO_ASSIGN',
                        description: 'User can assign photo review documents to other users.',
                        createdDate: '2015-11-02T20:28:18.000-05:00',
                        modifiedDate: '2015-12-01T15:31:01.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2653,
                        name: 'DEALER_URL_UPDATE_MERGE_SELLER',
                        description:
                            "A user can redirect a seller's URL to go to another existing URL that is not in the same L1.  WARNING: This should be a limited permission since the risk is that two independent entities may be merged mistakenly.",
                        createdDate: '2018-07-26T11:18:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2403,
                        name: 'REACTIVATE_DEALER_ACCOUNTS',
                        description:
                            'Ability to open the dealer status modal in DMT even if an account is Closed.',
                        createdDate: '2017-06-06T10:53:27.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1892,
                        name: 'REVIEW_DATA_ASSIGN',
                        description: 'User can assign data review documents to other users.',
                        createdDate: '2015-11-02T20:28:36.000-05:00',
                        modifiedDate: '2015-12-01T15:30:59.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2663,
                        name: 'MULTISKU_ITEM_CREATE',
                        description:
                            'Internal admin can create a MultiSKU base products by masquerading as a seller and manage Variable Attributes & SKUs internally.',
                        createdDate: '2018-08-23T12:35:46.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1642,
                        name: 'OMT_SALES_REP_EDIT',
                        description: 'Can assign sales and edit sales reps on orders',
                        createdDate: '2015-08-13T15:43:17.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2413,
                        name: 'CREATE_TRADE_FIRM',
                        description: 'Permission to create and delete a trade firm.',
                        createdDate: '2017-08-02T18:47:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1902,
                        name: 'REVIEW_PHOTO_NOTES',
                        description:
                            'Allows a user to review a note on the internal inventory search page.',
                        createdDate: '2015-11-30T17:45:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2423,
                        name: 'UPDATE_TRADE_FIRM',
                        description:
                            "Update trade firm. Doesn't include account manager or tier update.",
                        createdDate: '2017-08-02T18:48:04.000-04:00',
                        modifiedDate: '2017-10-02T11:50:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1912,
                        name: 'REVIEW_APPROVE_PHOTO_DOCUMENT',
                        description:
                            '-User can be assigned photo review documents.\n-User can approve pending photo review documents.',
                        createdDate: '2015-12-01T15:17:36.000-05:00',
                        modifiedDate: '2015-12-17T13:31:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2683,
                        name: 'SWATCH_LIBRARY_ACCESS',
                        description: "Allows internal users to access a Seller's Swatch Library",
                        createdDate: '2018-09-26T11:02:22.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1404,
                        name: 'BASIC_INTERNAL',
                        description:
                            'Identifies an employee/internal user versus a buyer/.com user. Must have this permission to be able to login to the admin.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2173,
                        name: 'HYPERWALLET_BACKOFFICE_ACCESS',
                        description:
                            'Allows users to link directly to the Hyperwallet back office.',
                        createdDate: '2016-09-06T16:57:14.000-04:00',
                        modifiedDate: '2016-09-06T17:07:07.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1406,
                        name: 'INTERNAL_ADMIN_USER',
                        description:
                            'Identifies a user that has access to adminv.1 and citysearch [via a legacy cookie]',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-05-13T14:51:59.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1662,
                        name: 'OMT_SHIPPING_REP_EDIT',
                        description:
                            'permission to assign and/or edit Shipping Rep assigned to an order',
                        createdDate: '2015-09-22T13:31:57.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1408,
                        name: 'EDITORIAL_CMS_ACCESS',
                        description:
                            'Identifies as user that has access to the Editorial CMS - http://admin.1stdibs.com/editorials/login.php',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2433,
                        name: 'READ_TRADE_FIRM',
                        description: 'Basic access to read trade firm data.',
                        createdDate: '2017-08-02T18:49:15.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1410,
                        name: 'CMS_ACCESS',
                        description:
                            'Identifies a user that has access to the Collections CMS - http://adminv2.1stdibs.com/cms/',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1412,
                        name: 'PHOTO_ACCESS',
                        description:
                            'Identifies a user that has access to the Photo Tool - http://furniture.admin.1stdibs.com/citysearch-administration/photo_processing/i_view.php',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2693,
                        name: 'MULTISKU_SWATCH_CREATE',
                        description:
                            'The ability for an internal user to add Swatches to a Seller Swatch Library.',
                        createdDate: '2018-09-28T11:11:52.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1414,
                        name: 'CREATORS_ACCESS',
                        description:
                            'Identifies a user that has access to the Creators Tool - http://adminv2.1stdibs.com/internal/creators_edit',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2183,
                        name: 'ELIGIBILITY_DATE_ADMIN',
                        description:
                            'Allows users to modify the eligibility date of a listing by pushing it up our out.',
                        createdDate: '2016-09-06T16:57:46.000-04:00',
                        modifiedDate: '2016-09-06T17:08:03.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1416,
                        name: 'CONTROL_PERMISSIONS',
                        description: 'Ability to edit roles and permissions mapping.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-06-04T20:44:53.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1672,
                        name: 'WIRE_CREATE',
                        description:
                            'Permission required open and update the "Add Wire Details" modal in the iOMT',
                        createdDate: '2015-09-24T09:47:24.000-04:00',
                        modifiedDate: '2015-09-24T09:51:09.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1418,
                        name: 'ITEM_EDIT_LOCKED',
                        description:
                            'Permission to edit a locked item description field in the Item Upload tool after an item has been uploaded (not used for T2 launch)',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2443,
                        name: 'COLLECTIONS_ADD_EDIT',
                        description:
                            'The ability to add or edit collections through the v2 Collections Tool',
                        createdDate: '2017-08-15T11:40:54.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1420,
                        name: 'ITEM_ACCESS',
                        description: 'Permission to access Item Upload tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1932,
                        name: 'REVIEW_APPROVE_DATA_DOCUMENT',
                        description:
                            '-User can be assigned data review documents.\n-User can approve data review documents.',
                        createdDate: '2015-12-01T15:30:55.000-05:00',
                        modifiedDate: '2015-12-17T13:31:41.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1422,
                        name: 'MASQUERADE_AS_DEALER',
                        description: 'Permission to log in as a dealer from Admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1424,
                        name: 'MASQUERADE_AS_BUYER',
                        description: 'Permission to log in as a buyer from admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2193,
                        name: 'ENABLER_ACCESS',
                        description: 'Allows internal users to see the enabler tool',
                        createdDate: '2016-10-04T14:03:21.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1426,
                        name: 'CREATE_ACCOUNT',
                        description: 'Permission to create a new dealer account',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1682,
                        name: 'WIRE_CONFIRM',
                        description:
                            'Allows an internal user to open and complete the "Confirm Wire Details & Receipt" modal',
                        createdDate: '2015-09-24T09:47:46.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1428,
                        name: 'CUSTOMER_ACCESS',
                        description:
                            'Permission to lookup customer information via Customer Lookup on dashboard',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2453,
                        name: 'TRADE_STATUS_FIRMLESS',
                        description: 'Ability to remove verified trade members out of the firm.',
                        createdDate: '2017-09-18T13:23:32.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1430,
                        name: 'OMT_ACCESS',
                        description:
                            'Identifies a user that has access to the Order Management Tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1942,
                        name: 'EXPERT_REVIEW_REJECT',
                        description: 'User can soft or hard reject a listing from a publication',
                        createdDate: '2015-12-01T15:31:57.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1432,
                        name: 'OMT_ENTER_SHIPPING_QUOTE',
                        description: 'Permission to enter a shipping quote via iOMT',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:25.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1434,
                        name: 'OMT_ENTER_SHIPPING_MILESTONES',
                        description:
                            'Permission to update shipping statuses such as Mark Delivered, Mark Shipped, etc.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:16.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2203,
                        name: 'BILLING_RESTRICTED',
                        description:
                            'Ability to add the below charges or credits:\n- Refund: Order Related\n- Other Credit\n- Refund: Subscription & Listings\n- Item Return\n- Refund: Order Related\n- Other Debit\n- Refund: Subscription & Listings',
                        createdDate: '2016-10-17T15:01:19.000-04:00',
                        modifiedDate: '2016-11-30T17:33:42.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1436,
                        name: 'OMT_CANCEL_ORDER',
                        description: 'Permission to cancel a transaction via iOMT',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:58:29.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1692,
                        name: 'WIRE_VIEW_DETAILS',
                        description:
                            'Allows an internal user to view the "Name on Account" popover information that appears after wire details have been submitted',
                        createdDate: '2015-09-24T09:48:03.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1440,
                        name: 'OMT_ACCOUNTING',
                        description:
                            'Permission to taking billing actions in iOMT. Mark Shipper Paid, Mark Dealer Paid, Capture Payment, etc.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:04.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1952,
                        name: 'REGISTER_PLYCON_SHIPMENT',
                        description: 'For shipping to register Plycon shipments using EDI',
                        createdDate: '2015-12-17T14:49:56.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2721,
                        name: 'SWATCH_CREATE_EDIT',
                        description:
                            'Gives users the ability to add/edit swatch data internally on behalf of our sellers.',
                        createdDate: '2018-12-04T15:44:35.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1442,
                        name: 'OMT_MASQUERADE_AS_DEALER',
                        description: "Permission to log in to dealer's OM via iOMT",
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:01:08.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2722,
                        name: 'BULK_UPDATE_TRANSACTION_TRADE_FIRM',
                        description:
                            'This provides the user the ability to bulk update the trade firms on transactions',
                        createdDate: '2018-12-12T15:58:37.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1444,
                        name: 'OMT_MASQUERADE_AS_BUYER',
                        description: "Permission to log in to buyer's omt via iOMT",
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2014-02-14T16:11:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1446,
                        name: 'OMT_FRAUD_ACTIONS',
                        description:
                            'Permission to approve or reject a transaction, that requires Manual Review for fraud, via iOMT.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:00:48.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1962,
                        name: 'PUB_DELETE_ACTIVE',
                        description: 'User can delete an Active Publication on the dashboard.',
                        createdDate: '2016-01-11T19:55:11.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1963,
                        name: 'TRADE_ASSIGN_SUPPORT_LEVEL',
                        description:
                            'Ability to a assign a Trade Firm Sales Rep and Trade Firm Sales Tier',
                        createdDate: '2016-03-08T17:59:24.000-05:00',
                        modifiedDate: '2017-09-18T13:18:04.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2223,
                        name: 'BILLING_BASIC',
                        description:
                            'Codes Include:\nDISCOUNT_SET_UP\nDISCOUNT_MONTHLY\nDISCOUNT_AMPL_PRICED\nDISCOUNT_AMPL_PUR\nDISCOUNT_NEW_LIST\nDISCOUNT_FULL_SERVICE\nDISCOUNT_SELF_SERVICE\nDISCOUNT_HIDE_PRICE\nDS\nCREDIT_CARD_BRAINTREE\nCC\nCK\nWT\nSF\nMONTHLY\nTXN_OFFLINE_COMMISSION\nTXN_INA',
                        createdDate: '2016-10-17T15:14:02.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1458,
                        name: 'DEALER_ACCESS',
                        description: 'Ability to access (read) dealer information',
                        createdDate: '2014-03-26T16:12:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1460,
                        name: 'DEALER_EDIT_ACCOUNT',
                        description:
                            "Ability to edit a dealer's account settings such as fees, some storefront settings such as URL, and any other admin related function. This does not apply to editing items and addresses that the dealer can edit themselves.",
                        createdDate: '2014-03-26T16:17:09.000-04:00',
                        modifiedDate: '2014-07-24T11:24:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1464,
                        name: 'VERIFY_TRADE_USER',
                        description:
                            'Ability for an admin to designate user as a trade buyer or change their trade status.',
                        createdDate: '2014-04-17T15:01:04.000-04:00',
                        modifiedDate: '2017-10-02T11:51:19.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2233,
                        name: 'REVIEW_VETTING_IN_PROGRESS',
                        description: 'A user can create an In Progress Vetting Review document.',
                        createdDate: '2016-10-17T16:59:14.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2493,
                        name: 'TRANSFER',
                        description:
                            'Permission to read transfers and transfer items between buyers in the same firm.',
                        createdDate: '2017-10-20T14:14:27.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1983,
                        name: 'STOREFRONT_V2_MANAGER',
                        description:
                            'Access to view and access all features of the Storefront CMS.',
                        createdDate: '2016-04-01T10:55:58.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2243,
                        name: 'REVIEW_VETTING_APPROVED',
                        description: 'A user can mark an item Lightly or Fully Vetted',
                        createdDate: '2016-10-17T16:59:50.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1476,
                        name: 'VERIFY_VIP_USER',
                        description: 'Ability to flag a buyer as a VIP buyer',
                        createdDate: '2014-05-20T13:38:27.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1732,
                        name: 'UPLOAD_DEALER_IMAGE',
                        description:
                            'Ability to upload images to the dealer image (self service) upload endpoint. Required for write access in the image upload page.',
                        createdDate: '2015-11-12T18:09:20.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1733,
                        name: 'BULK_UPDATE_SEO',
                        description: 'Make updates to SEO metadata by using the bulk upload tool.',
                        createdDate: '2015-11-20T11:42:50.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1478,
                        name: 'CREATE_TEST_ITEMS',
                        description: 'Permission to see link for Test Items and access to page.',
                        createdDate: '2014-05-27T15:47:22.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2503,
                        name: 'OMT_UPDATE_SHIPPING_ADDRESS',
                        description: 'Ability to update shipping address on transactions',
                        createdDate: '2017-11-13T10:23:14.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1480,
                        name: 'DEALER_EDIT_STATUS',
                        description:
                            "Ability to Edit a Dealer's status - Pending, Active, Suspended, Internal - Nopay is still questionable.",
                        createdDate: '2014-06-16T13:52:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1993,
                        name: 'PUB_CREATE_SAT_SALE',
                        description: 'Permission to create Saturday Sale publications.',
                        createdDate: '2016-05-11T13:23:25.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1482,
                        name: 'DEALER_ACCESS_STATEMENT',
                        description:
                            "Ability to view access the Dealer's statement page in the internal admin.",
                        createdDate: '2014-06-16T15:04:36.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1484,
                        name: 'DEALER_EDIT_LOCATION',
                        description: "Ability to edit the location of a Dealer's account",
                        createdDate: '2014-07-09T02:36:20.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2253,
                        name: 'REVIEW_VETTING_VOID',
                        description: 'A user can explicitly void a vetting review document.',
                        createdDate: '2016-10-17T17:00:32.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1486,
                        name: 'DEALER_EDIT_STOREFRONT',
                        description:
                            "Ability to edit a dealer's images and links listed on the storefront.",
                        createdDate: '2014-07-24T11:22:15.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1488,
                        name: 'BULK_UPDATE_ACCESS',
                        description: 'Access to the CSV Bulk Update tool',
                        createdDate: '2014-07-30T14:58:39.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2513,
                        name: 'SEARCH_VISUALLY_SIMILAR',
                        description:
                            'Permission for internal 1stdibs users to be able to see and test a visually similar search feature before releasing it to the public.',
                        createdDate: '2017-12-29T12:50:49.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1494,
                        name: 'DEVELOPER_TOOLS_ACCESS',
                        description:
                            'Permission required to view Developer Tools section on the internal dashboard',
                        createdDate: '2014-08-27T15:51:28.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1496,
                        name: 'DEVELOPER_STYLE_GUIDE',
                        description: 'Access to Style Guide link on internal dashboard',
                        createdDate: '2014-08-27T15:54:26.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1752,
                        name: 'PUB_DASHBOARD_ACCESS',
                        description:
                            "* Link to the Publication Dashboard will appear on user's internal admin dashboard.\n* User can view all publications.\n* User can apply filters on the dashboard.\n* User can click Title link when active.",
                        createdDate: '2015-11-02T18:15:53.000-05:00',
                        modifiedDate: '2015-11-02T20:29:30.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1498,
                        name: 'DEVELOPER_LINKS',
                        description:
                            'Access to links for developer tools on internal dashboard:\n1stdibs.com Server Statuses\nAdmin V2 Server Statuses\nService Status Board\n1stdibs.com Wiki\nSlack\nMothra',
                        createdDate: '2014-08-27T15:55:24.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2523,
                        name: 'BULK_ITEM_SUBMISSION',
                        description: 'The ability to bulk submit items from IIM to MPL or FNL.',
                        createdDate: '2018-01-04T11:43:01.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1500,
                        name: 'DEVELOPER_TOOLS',
                        description:
                            'Access to links for engineer specific tools:\nAutomated Tests\nHelper Utilities',
                        createdDate: '2014-08-27T15:56:22.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1504,
                        name: 'MOBILE_CREATE_NOTIFICATION',
                        description: 'Allows a user to create a new notification in the CMS',
                        createdDate: '2014-10-09T12:25:52.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2273,
                        name: 'VETTING_FILTERING',
                        description: 'Allows users to filter for various vetting states in IIM.',
                        createdDate: '2016-10-25T12:32:20.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1506,
                        name: 'MOBILE_PUBLISH_NOTIFICATION',
                        description: 'Ability to push a notification live.',
                        createdDate: '2014-10-09T12:27:11.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1762,
                        name: 'PUB_EDIT_ACCESS',
                        description:
                            '* User view the Edit Publication page in any mode. \n* User can view all listings in a given publication.\n* User can apply filters in the Review or Merchandising mode. \n* User can search for a listing. \n* User can sort listings.',
                        createdDate: '2015-11-02T18:17:04.000-05:00',
                        modifiedDate: '2015-11-02T20:31:39.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1508,
                        name: 'SHIPPING_BULK_UPDATE',
                        description: 'Permission required to make bulk updates to shipping quotes.',
                        createdDate: '2014-10-20T11:57:09.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2023,
                        name: 'PUB_PROMOTE_DEMOTE',
                        description:
                            'Allows user the ability to promote listings from Marketplace to Featured and demote listings to Marketplace or Storefront.',
                        createdDate: '2016-07-06T10:02:00.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1512,
                        name: 'ITEM_ACTION',
                        description:
                            'Allows admins to take actions on items such as:\n Mark Sold\nMark Unsold\nUnlist\nMove to Storefront\nMove to WIP\nMark On Hold/Off Hold\nMark Sold Private (action TBD)',
                        createdDate: '2014-12-03T14:32:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2283,
                        name: 'TRADE_SALES_REP_ASSIGNEE',
                        description: 'User can be assigned as a Sales Rep to a Trade Buyer.',
                        createdDate: '2016-10-27T11:19:58.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1772,
                        name: 'PUB_CREATE',
                        description: 'User can create a Publication on the dashboard.',
                        createdDate: '2015-11-02T18:19:13.000-05:00',
                        modifiedDate: '2015-12-01T15:31:31.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2543,
                        name: 'SHIPMENT_MONITOR',
                        description: 'Give users the ability to access shipment monitoring tool',
                        createdDate: '2018-02-09T14:55:02.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2033,
                        name: 'OMT_SUPPORT_REP_EDIT',
                        description:
                            'This permission permits a user to edit the support rep on a field. This should be provided to everyone with OMT_SUPPORT_REP as well as QA, PM, etc.',
                        createdDate: '2016-07-29T09:57:38.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1522,
                        name: 'ITEM_SEARCH',
                        description:
                            'Permission to access Internal Inventory Search, currently only used to hide the link, but eventually will be used to restrict users from accessing the page.',
                        createdDate: '2014-12-11T12:24:14.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2293,
                        name: 'TRADE_CMS_ACCESS',
                        description:
                            'Permission to access the Trade CMS for Public Profiles specifically.',
                        createdDate: '2016-11-23T09:12:20.000-05:00',
                        modifiedDate: '2017-10-02T11:52:12.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1782,
                        name: 'PUB_DELETE',
                        description: 'User can delete a non-Active Publication on the dashboard.',
                        createdDate: '2015-11-02T18:19:37.000-05:00',
                        modifiedDate: '2016-01-11T19:54:36.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2553,
                        name: 'THE_SMILEY_REPORT',
                        description: 'The smiley report process ran by the paid media team',
                        createdDate: '2018-03-01T13:38:06.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2043,
                        name: 'DEALER_ANNOUNCEMENTS',
                        description:
                            'User has access to Dealer Announcements and can edit/create/push live dealer announcements.',
                        createdDate: '2016-08-18T16:54:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1532,
                        name: 'OMT_SHIPPING_EXCEPTIONS',
                        description: 'Permission required to act on shipping exceptions in iOMT.',
                        createdDate: '2015-01-29T11:28:24.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2433,
                        name: 'READ_TRADE_FIRM',
                        description: 'Basic access to read trade firm data.',
                        createdDate: '2017-08-02T18:49:15.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2373,
                        name: 'ADDENDUM_ASSIGN',
                        description:
                            'Gives internal users the ability to put a dealer on the whitelist that controls displaying the addendum.',
                        createdDate: '2017-05-19T12:49:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1414,
                        name: 'CREATORS_ACCESS',
                        description:
                            'Identifies a user that has access to the Creators Tool - http://adminv2.1stdibs.com/internal/creators_edit',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1480,
                        name: 'DEALER_EDIT_STATUS',
                        description:
                            "Ability to Edit a Dealer's status - Pending, Active, Suspended, Internal - Nopay is still questionable.",
                        createdDate: '2014-06-16T13:52:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1482,
                        name: 'DEALER_ACCESS_STATEMENT',
                        description:
                            "Ability to view access the Dealer's statement page in the internal admin.",
                        createdDate: '2014-06-16T15:04:36.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1420,
                        name: 'ITEM_ACCESS',
                        description: 'Permission to access Item Upload tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1484,
                        name: 'DEALER_EDIT_LOCATION',
                        description: "Ability to edit the location of a Dealer's account",
                        createdDate: '2014-07-09T02:36:20.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1422,
                        name: 'MASQUERADE_AS_DEALER',
                        description: 'Permission to log in as a dealer from Admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1424,
                        name: 'MASQUERADE_AS_BUYER',
                        description: 'Permission to log in as a buyer from admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2513,
                        name: 'SEARCH_VISUALLY_SIMILAR',
                        description:
                            'Permission for internal 1stdibs users to be able to see and test a visually similar search feature before releasing it to the public.',
                        createdDate: '2017-12-29T12:50:49.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1426,
                        name: 'CREATE_ACCOUNT',
                        description: 'Permission to create a new dealer account',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2003,
                        name: 'DEALER_EDIT_MIN_INVENTORY',
                        description: 'Edit minimum inventory settings in Dealer Management',
                        createdDate: '2016-05-31T13:16:48.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1428,
                        name: 'CUSTOMER_ACCESS',
                        description:
                            'Permission to lookup customer information via Customer Lookup on dashboard',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1492,
                        name: 'ACCOUNT_REP',
                        description: 'Permission to assign account managers to dealer accounts.',
                        createdDate: '2014-08-27T13:57:23.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2581,
                        name: 'CREATORS_SUBMIT_PENDING',
                        description:
                            'Gives internal users the ability to submit pending creators from Item Upload.',
                        createdDate: '2018-04-12T10:59:56.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1430,
                        name: 'OMT_ACCESS',
                        description:
                            'Identifies a user that has access to the Order Management Tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2013,
                        name: 'DEALER_EDIT_POLICY_FIELDS',
                        description: 'Edit all policy fields in Dealer Management',
                        createdDate: '2016-05-31T13:18:53.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1512,
                        name: 'ITEM_ACTION',
                        description:
                            'Allows admins to take actions on items such as:\n Mark Sold\nMark Unsold\nUnlist\nMove to Storefront\nMove to WIP\nMark On Hold/Off Hold\nMark Sold Private (action TBD)',
                        createdDate: '2014-12-03T14:32:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1458,
                        name: 'DEALER_ACCESS',
                        description: 'Ability to access (read) dealer information',
                        createdDate: '2014-03-26T16:12:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1522,
                        name: 'ITEM_SEARCH',
                        description:
                            'Permission to access Internal Inventory Search, currently only used to hide the link, but eventually will be used to restrict users from accessing the page.',
                        createdDate: '2014-12-11T12:24:14.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1460,
                        name: 'DEALER_EDIT_ACCOUNT',
                        description:
                            "Ability to edit a dealer's account settings such as fees, some storefront settings such as URL, and any other admin related function. This does not apply to editing items and addresses that the dealer can edit themselves.",
                        createdDate: '2014-03-26T16:17:09.000-04:00',
                        modifiedDate: '2014-07-24T11:24:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1404,
                        name: 'BASIC_INTERNAL',
                        description:
                            'Identifies an employee/internal user versus a buyer/.com user. Must have this permission to be able to login to the admin.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2173,
                        name: 'HYPERWALLET_BACKOFFICE_ACCESS',
                        description:
                            'Allows users to link directly to the Hyperwallet back office.',
                        createdDate: '2016-09-06T16:57:14.000-04:00',
                        modifiedDate: '2016-09-06T17:07:07.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2493,
                        name: 'TRANSFER',
                        description:
                            'Permission to read transfers and transfer items between buyers in the same firm.',
                        createdDate: '2017-10-20T14:14:27.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1406,
                        name: 'INTERNAL_ADMIN_USER',
                        description:
                            'Identifies a user that has access to adminv.1 and citysearch [via a legacy cookie]',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-05-13T14:51:59.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1428,
                        name: 'CUSTOMER_ACCESS',
                        description:
                            'Permission to lookup customer information via Customer Lookup on dashboard',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1416,
                        name: 'CONTROL_PERMISSIONS',
                        description: 'Ability to edit roles and permissions mapping.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-06-04T20:44:53.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1512,
                        name: 'ITEM_ACTION',
                        description:
                            'Allows admins to take actions on items such as:\n Mark Sold\nMark Unsold\nUnlist\nMove to Storefront\nMove to WIP\nMark On Hold/Off Hold\nMark Sold Private (action TBD)',
                        createdDate: '2014-12-03T14:32:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1450,
                        name: 'ASSIGN_ROLES',
                        description:
                            'Ability to assign roles to admin users. Reserved for Helpdesk.',
                        createdDate: '2014-01-30T17:36:34.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1404,
                        name: 'BASIC_INTERNAL',
                        description:
                            'Identifies an employee/internal user versus a buyer/.com user. Must have this permission to be able to login to the admin.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1440,
                        name: 'OMT_ACCOUNTING',
                        description:
                            'Permission to taking billing actions in iOMT. Mark Shipper Paid, Mark Dealer Paid, Capture Payment, etc.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:04.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2433,
                        name: 'READ_TRADE_FIRM',
                        description: 'Basic access to read trade firm data.',
                        createdDate: '2017-08-02T18:49:15.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1442,
                        name: 'OMT_MASQUERADE_AS_DEALER',
                        description: "Permission to log in to dealer's OM via iOMT",
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:01:08.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1444,
                        name: 'OMT_MASQUERADE_AS_BUYER',
                        description: "Permission to log in to buyer's omt via iOMT",
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2014-02-14T16:11:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1446,
                        name: 'OMT_FRAUD_ACTIONS',
                        description:
                            'Permission to approve or reject a transaction, that requires Manual Review for fraud, via iOMT.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:00:48.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1420,
                        name: 'ITEM_ACCESS',
                        description: 'Permission to access Item Upload tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1422,
                        name: 'MASQUERADE_AS_DEALER',
                        description: 'Permission to log in as a dealer from Admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1424,
                        name: 'MASQUERADE_AS_BUYER',
                        description: 'Permission to log in as a buyer from admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1522,
                        name: 'ITEM_SEARCH',
                        description:
                            'Permission to access Internal Inventory Search, currently only used to hide the link, but eventually will be used to restrict users from accessing the page.',
                        createdDate: '2014-12-11T12:24:14.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1428,
                        name: 'CUSTOMER_ACCESS',
                        description:
                            'Permission to lookup customer information via Customer Lookup on dashboard',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1430,
                        name: 'OMT_ACCESS',
                        description:
                            'Identifies a user that has access to the Order Management Tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1432,
                        name: 'OMT_ENTER_SHIPPING_QUOTE',
                        description: 'Permission to enter a shipping quote via iOMT',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:25.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1434,
                        name: 'OMT_ENTER_SHIPPING_MILESTONES',
                        description:
                            'Permission to update shipping statuses such as Mark Delivered, Mark Shipped, etc.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:16.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1404,
                        name: 'BASIC_INTERNAL',
                        description:
                            'Identifies an employee/internal user versus a buyer/.com user. Must have this permission to be able to login to the admin.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1436,
                        name: 'OMT_CANCEL_ORDER',
                        description: 'Permission to cancel a transaction via iOMT',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:58:29.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1532,
                        name: 'OMT_SHIPPING_EXCEPTIONS',
                        description: 'Permission required to act on shipping exceptions in iOMT.',
                        createdDate: '2015-01-29T11:28:24.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1406,
                        name: 'INTERNAL_ADMIN_USER',
                        description:
                            'Identifies a user that has access to adminv.1 and citysearch [via a legacy cookie]',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-05-13T14:51:59.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1438,
                        name: 'OMT_FLAG_MESSAGE',
                        description: 'Permission to flag a dealer message as inappropriate',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:40.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1428,
                        name: 'CUSTOMER_ACCESS',
                        description:
                            'Permission to lookup customer information via Customer Lookup on dashboard',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1450,
                        name: 'ASSIGN_ROLES',
                        description:
                            'Ability to assign roles to admin users. Reserved for Helpdesk.',
                        createdDate: '2014-01-30T17:36:34.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1404,
                        name: 'BASIC_INTERNAL',
                        description:
                            'Identifies an employee/internal user versus a buyer/.com user. Must have this permission to be able to login to the admin.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1582,
                        name: 'PROMO_CREATE',
                        description: 'Can create new promotions.',
                        createdDate: '2015-04-03T15:28:27.000-04:00',
                        modifiedDate: '2017-02-13T09:57:51.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2053,
                        name: 'TAXONOMY_MAPPING',
                        description: 'Taxonomy Mapping',
                        createdDate: '2016-08-23T11:00:00.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1542,
                        name: 'ITEM_IMAGE_UNLOCK',
                        description: 'Permission to edit the locked main image on an item',
                        createdDate: '2015-02-27T15:10:11.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2313,
                        name: 'BULK_REPOST_MP',
                        description:
                            'Allows users to bulk repost inventory to Marketplace from Dealer Inventory Management.',
                        createdDate: '2017-01-05T15:58:15.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1802,
                        name: 'PUB_MERCHANDISING',
                        description:
                            '* User can rearrange listings within a page.  \n* User can move listings to a specific page or end of publication.',
                        createdDate: '2015-11-02T18:29:55.000-05:00',
                        modifiedDate: '2015-11-02T20:32:33.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1552,
                        name: 'MOBILE_PUBLISH_DISCOVER',
                        description:
                            'Permission to publish new discover lists from the Discover CMS.',
                        createdDate: '2015-03-11T18:17:01.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1812,
                        name: 'PUB_TRANSITION_PUBLICATION',
                        description:
                            '* The ability to transition a publication between different workflow states.\n* User can go to Merchandizing Mode.\n* User can preview publication.  \n* User can return to Merchandizing from Preview mode.  \n* User can mark publication "Ready for Publishing".',
                        createdDate: '2015-11-02T18:30:45.000-05:00',
                        modifiedDate: '2016-01-15T13:52:24.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2581,
                        name: 'CREATORS_SUBMIT_PENDING',
                        description:
                            'Gives internal users the ability to submit pending creators from Item Upload.',
                        createdDate: '2018-04-12T10:59:56.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2073,
                        name: 'ELIGIBILITY_DATE_DELAY',
                        description: 'Allows a user to delay listings in Pub Tools',
                        createdDate: '2016-08-25T18:37:41.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1562,
                        name: 'MOBILE_CREATE_DISCOVER',
                        description:
                            'Permission to create/edit Discover Lists, Preview in app, and access tool to do so.',
                        createdDate: '2015-03-11T18:17:55.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1822,
                        name: 'PUB_LISTING_NOTES',
                        description:
                            '* User can bookmark listings.\n* User can create, read, update, and delete listing notes.',
                        createdDate: '2015-11-02T18:32:01.000-05:00',
                        modifiedDate: '2015-11-02T20:32:22.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2083,
                        name: 'HYPERWALLET_ACCOUNT_CREATE',
                        description:
                            'Users can create payout accounts for our Dealers in Hyperwallet.',
                        createdDate: '2016-08-30T11:06:45.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1832,
                        name: 'PUB_RESCHEDULE_LISTINGS',
                        description: 'User can reschedule listings.',
                        createdDate: '2015-11-02T18:33:31.000-05:00',
                        modifiedDate: '2015-12-01T15:31:19.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2601,
                        name: 'SKU_EDIT',
                        description: 'Ability to edit a SKU.',
                        createdDate: '2018-05-04T11:29:55.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2353,
                        name: 'CREATE_TEST_ACCOUNT',
                        description:
                            'Enables the user to create test accounts via the create dealer tool. Will also display the "Create New Dealer" link in the user\'s navigation / dashboard.',
                        createdDate: '2017-02-21T11:41:27.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1842,
                        name: 'PUB_ATTACH_ADDTL_LISTINGS',
                        description:
                            'The ability to attach eligible listings once the publication is in Pending mode.',
                        createdDate: '2015-11-02T18:35:05.000-05:00',
                        modifiedDate: '2015-12-01T15:31:15.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1852,
                        name: 'PUB_PUBLISH',
                        description: 'User can publish a publication in the Complete state.',
                        createdDate: '2015-11-02T19:55:00.000-05:00',
                        modifiedDate: '2015-12-01T15:31:13.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1862,
                        name: 'REVIEW_PHOTO_PROCESSING_QUEUE',
                        description:
                            '* User can access the Photo Processing Queue from the Pub Tools Dashboard.\n* User can filter by Review Type, Review Status, Review Assignee, Publication',
                        createdDate: '2015-11-02T20:27:37.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2383,
                        name: 'OPOP_FINAL_WARNING_SET',
                        description:
                            'The ability to add dealers to the OPOP Final Warning whitelist from the Policy & Fees modal in DMT.',
                        createdDate: '2017-06-02T13:26:23.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1872,
                        name: 'REVIEW_DATA_QUEUE',
                        description:
                            '* User can access the Data Review Queue from the Pub Tools Dashboard.\n* User can filter by Review Type, Review Status, Review Assignee, Publication',
                        createdDate: '2015-11-02T20:28:01.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1622,
                        name: 'BUYER_SUMMARY',
                        description:
                            'Permission required to see the Customer Spend Summary in the customer details modal.',
                        createdDate: '2015-04-13T14:01:01.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2393,
                        name: 'OPOP_FINAL_WARNING_UNSET',
                        description:
                            'The ability to remove a dealer from the OPOP Final Warning whitelist from the Policy & Fees modal in DMT.',
                        createdDate: '2017-06-02T13:27:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1882,
                        name: 'REVIEW_PHOTO_ASSIGN',
                        description: 'User can assign photo review documents to other users.',
                        createdDate: '2015-11-02T20:28:18.000-05:00',
                        modifiedDate: '2015-12-01T15:31:01.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2403,
                        name: 'REACTIVATE_DEALER_ACCOUNTS',
                        description:
                            'Ability to open the dealer status modal in DMT even if an account is Closed.',
                        createdDate: '2017-06-06T10:53:27.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1892,
                        name: 'REVIEW_DATA_ASSIGN',
                        description: 'User can assign data review documents to other users.',
                        createdDate: '2015-11-02T20:28:36.000-05:00',
                        modifiedDate: '2015-12-01T15:30:59.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2663,
                        name: 'MULTISKU_ITEM_CREATE',
                        description:
                            'Internal admin can create a MultiSKU base products by masquerading as a seller and manage Variable Attributes & SKUs internally.',
                        createdDate: '2018-08-23T12:35:46.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1642,
                        name: 'OMT_SALES_REP_EDIT',
                        description: 'Can assign sales and edit sales reps on orders',
                        createdDate: '2015-08-13T15:43:17.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2413,
                        name: 'CREATE_TRADE_FIRM',
                        description: 'Permission to create and delete a trade firm.',
                        createdDate: '2017-08-02T18:47:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1902,
                        name: 'REVIEW_PHOTO_NOTES',
                        description:
                            'Allows a user to review a note on the internal inventory search page.',
                        createdDate: '2015-11-30T17:45:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2423,
                        name: 'UPDATE_TRADE_FIRM',
                        description:
                            "Update trade firm. Doesn't include account manager or tier update.",
                        createdDate: '2017-08-02T18:48:04.000-04:00',
                        modifiedDate: '2017-10-02T11:50:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1912,
                        name: 'REVIEW_APPROVE_PHOTO_DOCUMENT',
                        description:
                            '-User can be assigned photo review documents.\n-User can approve pending photo review documents.',
                        createdDate: '2015-12-01T15:17:36.000-05:00',
                        modifiedDate: '2015-12-17T13:31:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2683,
                        name: 'SWATCH_LIBRARY_ACCESS',
                        description: "Allows internal users to access a Seller's Swatch Library",
                        createdDate: '2018-09-26T11:02:22.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1404,
                        name: 'BASIC_INTERNAL',
                        description:
                            'Identifies an employee/internal user versus a buyer/.com user. Must have this permission to be able to login to the admin.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2173,
                        name: 'HYPERWALLET_BACKOFFICE_ACCESS',
                        description:
                            'Allows users to link directly to the Hyperwallet back office.',
                        createdDate: '2016-09-06T16:57:14.000-04:00',
                        modifiedDate: '2016-09-06T17:07:07.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1406,
                        name: 'INTERNAL_ADMIN_USER',
                        description:
                            'Identifies a user that has access to adminv.1 and citysearch [via a legacy cookie]',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-05-13T14:51:59.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1408,
                        name: 'EDITORIAL_CMS_ACCESS',
                        description:
                            'Identifies as user that has access to the Editorial CMS - http://admin.1stdibs.com/editorials/login.php',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2433,
                        name: 'READ_TRADE_FIRM',
                        description: 'Basic access to read trade firm data.',
                        createdDate: '2017-08-02T18:49:15.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1410,
                        name: 'CMS_ACCESS',
                        description:
                            'Identifies a user that has access to the Collections CMS - http://adminv2.1stdibs.com/cms/',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1412,
                        name: 'PHOTO_ACCESS',
                        description:
                            'Identifies a user that has access to the Photo Tool - http://furniture.admin.1stdibs.com/citysearch-administration/photo_processing/i_view.php',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2693,
                        name: 'MULTISKU_SWATCH_CREATE',
                        description:
                            'The ability for an internal user to add Swatches to a Seller Swatch Library.',
                        createdDate: '2018-09-28T11:11:52.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1414,
                        name: 'CREATORS_ACCESS',
                        description:
                            'Identifies a user that has access to the Creators Tool - http://adminv2.1stdibs.com/internal/creators_edit',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2183,
                        name: 'ELIGIBILITY_DATE_ADMIN',
                        description:
                            'Allows users to modify the eligibility date of a listing by pushing it up our out.',
                        createdDate: '2016-09-06T16:57:46.000-04:00',
                        modifiedDate: '2016-09-06T17:08:03.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1416,
                        name: 'CONTROL_PERMISSIONS',
                        description: 'Ability to edit roles and permissions mapping.',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                        modifiedDate: '2014-06-04T20:44:53.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1672,
                        name: 'WIRE_CREATE',
                        description:
                            'Permission required open and update the "Add Wire Details" modal in the iOMT',
                        createdDate: '2015-09-24T09:47:24.000-04:00',
                        modifiedDate: '2015-09-24T09:51:09.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1418,
                        name: 'ITEM_EDIT_LOCKED',
                        description:
                            'Permission to edit a locked item description field in the Item Upload tool after an item has been uploaded (not used for T2 launch)',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2443,
                        name: 'COLLECTIONS_ADD_EDIT',
                        description:
                            'The ability to add or edit collections through the v2 Collections Tool',
                        createdDate: '2017-08-15T11:40:54.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1420,
                        name: 'ITEM_ACCESS',
                        description: 'Permission to access Item Upload tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1932,
                        name: 'REVIEW_APPROVE_DATA_DOCUMENT',
                        description:
                            '-User can be assigned data review documents.\n-User can approve data review documents.',
                        createdDate: '2015-12-01T15:30:55.000-05:00',
                        modifiedDate: '2015-12-17T13:31:41.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1422,
                        name: 'MASQUERADE_AS_DEALER',
                        description: 'Permission to log in as a dealer from Admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1424,
                        name: 'MASQUERADE_AS_BUYER',
                        description: 'Permission to log in as a buyer from admin v.1 screens',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2193,
                        name: 'ENABLER_ACCESS',
                        description: 'Allows internal users to see the enabler tool',
                        createdDate: '2016-10-04T14:03:21.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1426,
                        name: 'CREATE_ACCOUNT',
                        description: 'Permission to create a new dealer account',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1682,
                        name: 'WIRE_CONFIRM',
                        description:
                            'Allows an internal user to open and complete the "Confirm Wire Details & Receipt" modal',
                        createdDate: '2015-09-24T09:47:46.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1428,
                        name: 'CUSTOMER_ACCESS',
                        description:
                            'Permission to lookup customer information via Customer Lookup on dashboard',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2453,
                        name: 'TRADE_STATUS_FIRMLESS',
                        description: 'Ability to remove verified trade members out of the firm.',
                        createdDate: '2017-09-18T13:23:32.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1430,
                        name: 'OMT_ACCESS',
                        description:
                            'Identifies a user that has access to the Order Management Tool',
                        createdDate: '2014-01-13T17:11:23.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1942,
                        name: 'EXPERT_REVIEW_REJECT',
                        description: 'User can soft or hard reject a listing from a publication',
                        createdDate: '2015-12-01T15:31:57.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1432,
                        name: 'OMT_ENTER_SHIPPING_QUOTE',
                        description: 'Permission to enter a shipping quote via iOMT',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:25.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1434,
                        name: 'OMT_ENTER_SHIPPING_MILESTONES',
                        description:
                            'Permission to update shipping statuses such as Mark Delivered, Mark Shipped, etc.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:16.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1436,
                        name: 'OMT_CANCEL_ORDER',
                        description: 'Permission to cancel a transaction via iOMT',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:58:29.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1692,
                        name: 'WIRE_VIEW_DETAILS',
                        description:
                            'Allows an internal user to view the "Name on Account" popover information that appears after wire details have been submitted',
                        createdDate: '2015-09-24T09:48:03.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1438,
                        name: 'OMT_FLAG_MESSAGE',
                        description: 'Permission to flag a dealer message as inappropriate',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:40.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1440,
                        name: 'OMT_ACCOUNTING',
                        description:
                            'Permission to taking billing actions in iOMT. Mark Shipper Paid, Mark Dealer Paid, Capture Payment, etc.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T16:59:04.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2721,
                        name: 'SWATCH_CREATE_EDIT',
                        description:
                            'Gives users the ability to add/edit swatch data internally on behalf of our sellers.',
                        createdDate: '2018-12-04T15:44:35.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1442,
                        name: 'OMT_MASQUERADE_AS_DEALER',
                        description: "Permission to log in to dealer's OM via iOMT",
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:01:08.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2722,
                        name: 'BULK_UPDATE_TRANSACTION_TRADE_FIRM',
                        description:
                            'This provides the user the ability to bulk update the trade firms on transactions',
                        createdDate: '2018-12-12T15:58:37.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1444,
                        name: 'OMT_MASQUERADE_AS_BUYER',
                        description: "Permission to log in to buyer's omt via iOMT",
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2014-02-14T16:11:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1446,
                        name: 'OMT_FRAUD_ACTIONS',
                        description:
                            'Permission to approve or reject a transaction, that requires Manual Review for fraud, via iOMT.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:00:48.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1448,
                        name: 'OMT_SUPPORT_REP',
                        description:
                            'Permission to assign or edit Order Support Rep via iOMT. Also used to populate Order Rep filter drop down.',
                        createdDate: '2014-01-13T17:11:24.000-05:00',
                        modifiedDate: '2015-04-10T17:02:01.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1450,
                        name: 'ASSIGN_ROLES',
                        description:
                            'Ability to assign roles to admin users. Reserved for Helpdesk.',
                        createdDate: '2014-01-30T17:36:34.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1962,
                        name: 'PUB_DELETE_ACTIVE',
                        description: 'User can delete an Active Publication on the dashboard.',
                        createdDate: '2016-01-11T19:55:11.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1963,
                        name: 'TRADE_ASSIGN_SUPPORT_LEVEL',
                        description:
                            'Ability to a assign a Trade Firm Sales Rep and Trade Firm Sales Tier',
                        createdDate: '2016-03-08T17:59:24.000-05:00',
                        modifiedDate: '2017-09-18T13:18:04.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1456,
                        name: 'CUSTOMER_DISABLE_ACCOUNT',
                        description: 'Permission to disable or enable buyer accounts',
                        createdDate: '2014-02-20T15:18:47.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1458,
                        name: 'DEALER_ACCESS',
                        description: 'Ability to access (read) dealer information',
                        createdDate: '2014-03-26T16:12:30.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1460,
                        name: 'DEALER_EDIT_ACCOUNT',
                        description:
                            "Ability to edit a dealer's account settings such as fees, some storefront settings such as URL, and any other admin related function. This does not apply to editing items and addresses that the dealer can edit themselves.",
                        createdDate: '2014-03-26T16:17:09.000-04:00',
                        modifiedDate: '2014-07-24T11:24:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1464,
                        name: 'VERIFY_TRADE_USER',
                        description:
                            'Ability for an admin to designate user as a trade buyer or change their trade status.',
                        createdDate: '2014-04-17T15:01:04.000-04:00',
                        modifiedDate: '2017-10-02T11:51:19.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2233,
                        name: 'REVIEW_VETTING_IN_PROGRESS',
                        description: 'A user can create an In Progress Vetting Review document.',
                        createdDate: '2016-10-17T16:59:14.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1983,
                        name: 'STOREFRONT_V2_MANAGER',
                        description:
                            'Access to view and access all features of the Storefront CMS.',
                        createdDate: '2016-04-01T10:55:58.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2243,
                        name: 'REVIEW_VETTING_APPROVED',
                        description: 'A user can mark an item Lightly or Fully Vetted',
                        createdDate: '2016-10-17T16:59:50.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1476,
                        name: 'VERIFY_VIP_USER',
                        description: 'Ability to flag a buyer as a VIP buyer',
                        createdDate: '2014-05-20T13:38:27.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1732,
                        name: 'UPLOAD_DEALER_IMAGE',
                        description:
                            'Ability to upload images to the dealer image (self service) upload endpoint. Required for write access in the image upload page.',
                        createdDate: '2015-11-12T18:09:20.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1733,
                        name: 'BULK_UPDATE_SEO',
                        description: 'Make updates to SEO metadata by using the bulk upload tool.',
                        createdDate: '2015-11-20T11:42:50.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1478,
                        name: 'CREATE_TEST_ITEMS',
                        description: 'Permission to see link for Test Items and access to page.',
                        createdDate: '2014-05-27T15:47:22.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1480,
                        name: 'DEALER_EDIT_STATUS',
                        description:
                            "Ability to Edit a Dealer's status - Pending, Active, Suspended, Internal - Nopay is still questionable.",
                        createdDate: '2014-06-16T13:52:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1993,
                        name: 'PUB_CREATE_SAT_SALE',
                        description: 'Permission to create Saturday Sale publications.',
                        createdDate: '2016-05-11T13:23:25.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1482,
                        name: 'DEALER_ACCESS_STATEMENT',
                        description:
                            "Ability to view access the Dealer's statement page in the internal admin.",
                        createdDate: '2014-06-16T15:04:36.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1484,
                        name: 'DEALER_EDIT_LOCATION',
                        description: "Ability to edit the location of a Dealer's account",
                        createdDate: '2014-07-09T02:36:20.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2253,
                        name: 'REVIEW_VETTING_VOID',
                        description: 'A user can explicitly void a vetting review document.',
                        createdDate: '2016-10-17T17:00:32.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1486,
                        name: 'DEALER_EDIT_STOREFRONT',
                        description:
                            "Ability to edit a dealer's images and links listed on the storefront.",
                        createdDate: '2014-07-24T11:22:15.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1488,
                        name: 'BULK_UPDATE_ACCESS',
                        description: 'Access to the CSV Bulk Update tool',
                        createdDate: '2014-07-30T14:58:39.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2513,
                        name: 'SEARCH_VISUALLY_SIMILAR',
                        description:
                            'Permission for internal 1stdibs users to be able to see and test a visually similar search feature before releasing it to the public.',
                        createdDate: '2017-12-29T12:50:49.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1490,
                        name: 'FINANCE_BULK_UPDATE',
                        description:
                            'Ability to use the Mark Dealer Paid and Mark Shipper actions in the bulk action tool',
                        createdDate: '2014-08-21T15:48:39.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1494,
                        name: 'DEVELOPER_TOOLS_ACCESS',
                        description:
                            'Permission required to view Developer Tools section on the internal dashboard',
                        createdDate: '2014-08-27T15:51:28.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1496,
                        name: 'DEVELOPER_STYLE_GUIDE',
                        description: 'Access to Style Guide link on internal dashboard',
                        createdDate: '2014-08-27T15:54:26.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1752,
                        name: 'PUB_DASHBOARD_ACCESS',
                        description:
                            "* Link to the Publication Dashboard will appear on user's internal admin dashboard.\n* User can view all publications.\n* User can apply filters on the dashboard.\n* User can click Title link when active.",
                        createdDate: '2015-11-02T18:15:53.000-05:00',
                        modifiedDate: '2015-11-02T20:29:30.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1498,
                        name: 'DEVELOPER_LINKS',
                        description:
                            'Access to links for developer tools on internal dashboard:\n1stdibs.com Server Statuses\nAdmin V2 Server Statuses\nService Status Board\n1stdibs.com Wiki\nSlack\nMothra',
                        createdDate: '2014-08-27T15:55:24.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2523,
                        name: 'BULK_ITEM_SUBMISSION',
                        description: 'The ability to bulk submit items from IIM to MPL or FNL.',
                        createdDate: '2018-01-04T11:43:01.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1500,
                        name: 'DEVELOPER_TOOLS',
                        description:
                            'Access to links for engineer specific tools:\nAutomated Tests\nHelper Utilities',
                        createdDate: '2014-08-27T15:56:22.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1504,
                        name: 'MOBILE_CREATE_NOTIFICATION',
                        description: 'Allows a user to create a new notification in the CMS',
                        createdDate: '2014-10-09T12:25:52.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2273,
                        name: 'VETTING_FILTERING',
                        description: 'Allows users to filter for various vetting states in IIM.',
                        createdDate: '2016-10-25T12:32:20.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1506,
                        name: 'MOBILE_PUBLISH_NOTIFICATION',
                        description: 'Ability to push a notification live.',
                        createdDate: '2014-10-09T12:27:11.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1762,
                        name: 'PUB_EDIT_ACCESS',
                        description:
                            '* User view the Edit Publication page in any mode. \n* User can view all listings in a given publication.\n* User can apply filters in the Review or Merchandising mode. \n* User can search for a listing. \n* User can sort listings.',
                        createdDate: '2015-11-02T18:17:04.000-05:00',
                        modifiedDate: '2015-11-02T20:31:39.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1508,
                        name: 'SHIPPING_BULK_UPDATE',
                        description: 'Permission required to make bulk updates to shipping quotes.',
                        createdDate: '2014-10-20T11:57:09.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2023,
                        name: 'PUB_PROMOTE_DEMOTE',
                        description:
                            'Allows user the ability to promote listings from Marketplace to Featured and demote listings to Marketplace or Storefront.',
                        createdDate: '2016-07-06T10:02:00.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1512,
                        name: 'ITEM_ACTION',
                        description:
                            'Allows admins to take actions on items such as:\n Mark Sold\nMark Unsold\nUnlist\nMove to Storefront\nMove to WIP\nMark On Hold/Off Hold\nMark Sold Private (action TBD)',
                        createdDate: '2014-12-03T14:32:54.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2283,
                        name: 'TRADE_SALES_REP_ASSIGNEE',
                        description: 'User can be assigned as a Sales Rep to a Trade Buyer.',
                        createdDate: '2016-10-27T11:19:58.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1772,
                        name: 'PUB_CREATE',
                        description: 'User can create a Publication on the dashboard.',
                        createdDate: '2015-11-02T18:19:13.000-05:00',
                        modifiedDate: '2015-12-01T15:31:31.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2033,
                        name: 'OMT_SUPPORT_REP_EDIT',
                        description:
                            'This permission permits a user to edit the support rep on a field. This should be provided to everyone with OMT_SUPPORT_REP as well as QA, PM, etc.',
                        createdDate: '2016-07-29T09:57:38.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1522,
                        name: 'ITEM_SEARCH',
                        description:
                            'Permission to access Internal Inventory Search, currently only used to hide the link, but eventually will be used to restrict users from accessing the page.',
                        createdDate: '2014-12-11T12:24:14.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2293,
                        name: 'TRADE_CMS_ACCESS',
                        description:
                            'Permission to access the Trade CMS for Public Profiles specifically.',
                        createdDate: '2016-11-23T09:12:20.000-05:00',
                        modifiedDate: '2017-10-02T11:52:12.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1782,
                        name: 'PUB_DELETE',
                        description: 'User can delete a non-Active Publication on the dashboard.',
                        createdDate: '2015-11-02T18:19:37.000-05:00',
                        modifiedDate: '2016-01-11T19:54:36.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2553,
                        name: 'THE_SMILEY_REPORT',
                        description: 'The smiley report process ran by the paid media team',
                        createdDate: '2018-03-01T13:38:06.000-05:00',
                    },
                    {
                        apiType: 'permission',
                        id: 2043,
                        name: 'DEALER_ANNOUNCEMENTS',
                        description:
                            'User has access to Dealer Announcements and can edit/create/push live dealer announcements.',
                        createdDate: '2016-08-18T16:54:42.000-04:00',
                    },
                    {
                        apiType: 'permission',
                        id: 1532,
                        name: 'OMT_SHIPPING_EXCEPTIONS',
                        description: 'Permission required to act on shipping exceptions in iOMT.',
                        createdDate: '2015-01-29T11:28:24.000-05:00',
                    },
                ],
                rolePermissionMappings: [],
            },
            active: 'Y',
            createdDate: '2013-09-25T21:29:45.000-04:00',
            modifiedDate: '2018-12-16T09:00:35.000-05:00',
            apiType: 'user',
        },
    },
};

export default function Results() {
    return (
        <div className={styles.wrapper}>
            <Inspector data={data} />
        </div>
    );
}
