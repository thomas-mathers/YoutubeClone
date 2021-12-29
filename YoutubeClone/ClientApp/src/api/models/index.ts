import { ChannelSummary, mapJsonToChannelSummary } from './channel-summary';
import { CommentSummary, mapJsonToCommentSummary } from './comment-summary';
import CreateChannelRequest from './create-channel-request';
import CreateCommentRequest from './create-comment-request';
import CreateReplyRequest from './create-reply-request';
import CreateSubscriptionRequest from './create-subscription-request';
import CreateUserRequest from './create-user-request';
import CreateVideoRequest from './create-video-request';
import LoginRequest from './login-request';
import { LoginResponse, mapJsonToLoginResponse } from './login-response';
import { SubscriptionSummary, mapJsonToSubscriptionSummary } from './subscription-summary';
import UpdateUserRequest from './update-user-request';
import { UserSummary, mapJsonToUserSummary } from './user-summary';
import { VideoSummary, mapJsonToVideoSummary } from './video-summary';
import { VideoDetail, mapJsonToVideoDetail } from './video-detail';
import Page from './page';

export {
    mapJsonToChannelSummary,
    mapJsonToCommentSummary,
    mapJsonToLoginResponse,
    mapJsonToSubscriptionSummary,
    mapJsonToUserSummary,
    mapJsonToVideoSummary,
    mapJsonToVideoDetail,
}

export type {
    ChannelSummary,
    
    CommentSummary,
    CreateChannelRequest,
    CreateCommentRequest,
    CreateReplyRequest,
    CreateSubscriptionRequest,
    CreateUserRequest,
    CreateVideoRequest,
    LoginRequest,
    LoginResponse,
    SubscriptionSummary,
    UpdateUserRequest,
    UserSummary,
    VideoSummary,
    VideoDetail,
    Page
}