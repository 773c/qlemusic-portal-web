<template>
  <div id="home">
    <!--走马灯-->
    <div class="home-carousel-wrapper">
      <el-carousel class="home-carousel" :interval="4000" type="card" style="background-size: cover;">
        <el-carousel-item class="home-el-carousel-item" v-for="item in 6" :key="item">
          <div class="medium">
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :options="playerOptions"
              :playsinline="true"
              customEventName="customstatechangedeventname"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
              @canplay="onPlayerCanplay($event)"
              @canplaythrough="onPlayerCanplaythrough($event)"
              @statechanged="playerStateChanged($event)"
              @ready="playerReadied">
            </video-player>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!--@ended="onPlayerEnded($event)"-->
      <!--@waiting="onPlayerWaiting($event)"-->
      <!--@playing="onPlayerPlaying($event)"-->
      <!--@loadeddata="onPlayerLoadeddata($event)"-->
      <!--@timeupdate="onPlayerTimeupdate($event)"-->
    </div>
    <collect-model :isShowCollectModel="isShowCollectModel" @addFavoriteHandler="addFavoriteHandler"></collect-model>
    <!--音频文章区域-->
    <div class="infinite-list-wrapper middle-bbs-music-wrapper">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="height: 60%;background-color: #222222;">
        <el-table ref="bbsMusicTable"
                  :data="(list||[]).slice(0,pageSize)"
                  border>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <div class="bbs-music-title-wrapper">
                <div class="bbs-music-title">推荐</div>
                <!--音量调节-->
                <div class="bbs-music-voice-wrapper">
                  <div class="bbs-music-voice-icon-wrapper" @click="voiceHandler">
                    <svg-icon class="bbs-music-voice-icon" :icon-class="changeVoiceIcon"></svg-icon>
                  </div>
                  <div class="bbs-music-voice-progress">
                    <el-slider v-model="voiceValue" :show-tooltip="true" @input="changeVolume"></el-slider>
                  </div>
                </div>
              </div>
            </template>
            <template #default="scope">
              <div class="bbs-music-row-wrapper">
                <div class="bbsm-row-title">
                  <span class="row-title-span" @click="seeMusicContent(scope.row.id)">{{scope.row.title}}</span>
                </div>
                <div class="bbsm-row-avatar-wrapper">
                  <el-popover
                    placement="top-start"
                    width="300"
                    offset="40"
                    trigger="hover">
                    <div class="bbsm-avatar-popover-wrapper">
                      <div class="popover-top-content-wrapper">
                        <div class="pt-avatar-wrapper">
                          <el-avatar :size=60
                                     :src="scope.row.umsUser === null?'':scope.row.umsUser.headIcon"></el-avatar>
                        </div>
                        <div class="pt-user-info-wrapper">
                          <div class="pt-user-info-name">{{scope.row.umsUser === null?'':scope.row.umsUser.name}}</div>
                          <div></div>
                        </div>
                      </div>
                      <hr style=" height:2px;border:none;border-top:1px solid #e9e9eb;"/>
                      <div class="popover-bottom-content-wrapper">
                        <div class="pb-into-home">
                          <el-button style="padding-top: 6px" type="text">进入主页</el-button>
                        </div>
                        <div class="pb-attention">
                          <el-button type="success" size="mini">关注</el-button>
                        </div>
                      </div>
                    </div>
                    <div class="bbsm-avatar-wrapper" slot="reference">
                      <el-avatar :size=30 :src="scope.row.umsUser === null?'':scope.row.umsUser.headIcon"></el-avatar>
                    </div>
                  </el-popover>
                </div>
                <!--名称-->
                <div class="bbsm-row-name-wrapper"
                     @click="seeUserSendMusic(scope.row.umsUser.id,scope.row.umsUser.uniqueId)">
                  <span class="publisher">{{scope.row.umsUser === null?'':scope.row.umsUser.name}}</span>
                </div>
                <!--播放器-->
                <div class="bbsm-row-audio-wrapper">
                  <ql-audio
                    ref="qlAudioRef"
                    :audioUrl="scope.row.audioUrl"
                    :audioImgUrl="scope.row.audioAvatarUrl"
                    :musicId="scope.row.id"
                    :isShowLineProgress="false"
                    :startTime="scope.row.startTime"
                    :playTime="scope.row.playTime"
                    :prevAudioVueComponent="prevAudioVueComponent"
                    @setPlayEffect="setPlayEffect">
                  </ql-audio>
                </div>
                <!--移动端播放量-->
                <div v-if="isMobile" class="play-text-wrapper">
                  <span>播放量 </span>
                  <span>{{bbsMusic.seeCount}}</span>
                </div>
                <!--评论-->
                <div class="comment div-threeIcon"
                     @click="openCommentModel(scope.row.id,scope.row.bbsUserCommentList,scope.$index)">
                  <svg-icon class="threeIcon" icon-class="comment"></svg-icon>
                  <br v-if="device==='mobile'?true:false"/>
                  <span>{{scope.row.bbsMusicOperation.commentCount === null?bbsMusic.commentCount:scope.row.bbsMusicOperation.commentCount}}</span>
                </div>
                <div class="bbsm-row-comment-drawer-wrapper" @click="hideReplyModel('')">
                  <el-drawer
                    :title="'评论（1）'"
                    class="comment-drawer"
                    :visible.sync="drawer"
                    :modal="false"
                    :direction="direction"
                    :show-close="true"
                    :size="direction === 'btt'?'60%':'35%'"
                    :withHeader="true"
                    @close="drawerCloseTrigger">
                    <div class="comment-wrapper">
                      <div class="comment-model-wrapper">
                        <div class="comment-input-wrapper">
                          <el-input
                            ref="textareaRef"
                            type="textarea"
                            v-model="commentValue"
                            :rows="direction === 'btt'?2:3"
                            maxlength="255"
                            show-word-limit
                            placeholder="期待您的评论..."
                            @blur="blurTrigger"
                            @focus="inputTrigger">
                          </el-input>
                        </div>
                        <div class="comment-input-button-wrapper">
                          <el-popover placement="bottom-start" width="350" trigger="click" class="emojiBox"
                                      @show="showEmojiPopover('textareaRef')">
                            <div class="emotionList">
                              <a href="javascript:void(0);" @click="getEmoji(index)" v-for="(item1,index) in faceList"
                                 :key="index" class="emotionItem">{{item1}}</a>
                            </div>
                            <img slot="reference" class="comment-input-emoji" src="@/assets/images/comment-emoji.png"
                                 width="23" height="23">
                          </el-popover>
                          <el-button class="comment-input-button" type="success" @click="sendCommentHandler()">发表
                          </el-button>
                        </div>
                      </div>
                      <div style="clear: both"></div>
                      <div v-if="commentList.length === 0" class="comment-empty-wrapper">暂无评论</div>
                      <div v-else class="comment-content-wrapper">
                        <div class="comment-content-title">精彩评论</div>
                        <hr style="border:none;border-bottom: 1px solid #e4e4e4;margin-top: 10px">
                        <!--每一条评论-->
                        <div
                          class="comment-content-row-wrapper"
                          @click.stop="hideReplyModel(index)"
                          v-for="(comment,index) in commentList" :key="index">
                          <div class="cc-avatar-wrapper">
                            <div class="cc-avatar">
                              <el-avatar :size=34 :src="comment.umsUser.headIcon"></el-avatar>
                            </div>
                            <div class="cc-name-wrapper">
                              <span class="cc-name">{{comment.umsUser.name}}：</span>
                              <span>{{comment.content}}</span>
                              <span><el-button
                                class="cc-button"
                                type="text"
                                style="margin-left: 10px;padding: 0 0"
                                @click="showReplyModel(1,index,'')">回复</el-button>
                              </span>
                            </div>
                            <div class="cc-time-wrapper">
                              <div class="cc-time">
                                {{comment.cusCreateTime}}
                              </div>
                            </div>
                            <!--回复框1-->
                            <div v-if="comment.isShowRelpy" class="comment-reply-model-wrapper">
                              <div class="comment-reply-input-wrapper">
                                <el-input
                                  :id="'textareaReply1'+index"
                                  type="textarea"
                                  v-model="replyCommentValue"
                                  :rows="direction === 'btt'?1:2"
                                  maxlength="255"
                                  show-word-limit
                                  @blur="blurTrigger"
                                  placeholder="填写您的回复...">
                                </el-input>
                              </div>
                              <div class="comment-reply-input-button-wrapper">
                                <el-popover placement="bottom-start" width="350" trigger="click" class="emojiBox"
                                            @show="replyShowEmojiPopover">
                                  <div class="emotionList">
                                    <a href="javascript:void(0);" @click="getReplyEmoji(1,index,index2)"
                                       v-for="(item2,index2) in faceList"
                                       :key="index2" class="emotionItem">{{item2}}</a>
                                  </div>
                                  <img slot="reference" class="comment-reply-input-emoji"
                                       src="@/assets/images/comment-emoji.png"
                                       width="21" height="21">
                                </el-popover>
                                <el-button class="comment-reply-input-button" type="success"
                                           @click="replyCommentHandler(comment.userId,comment.createTime,'',comment.rowId)">
                                  回复
                                </el-button>
                              </div>
                            </div>
                            <div style="clear: both"></div>
                          </div>
                          <div v-if="true" class="cc-open-other-user-wrapper">
                            <div class="cc-open-other-user">
                              <!--展开更多回复-->
                            </div>
                          </div>
                          <!--回复评论2-->
                          <div v-if="comment.bbsReplyuserCommentList !== null" class="cc-other-user-wrapper">
                            <div
                              class="ccou-content-row-wrapper"
                              v-for="(reply,rindex) in comment.bbsReplyuserCommentList"
                              :key="rindex">
                              <div class="ccou-content-wrapper">
                                <div class="ccou-avatar">
                                  <el-avatar :size=30 :src="reply.umsUser.headIcon"></el-avatar>
                                </div>
                                <div class="ccou-name-wrapper">
                                  <span class="ccou-name">{{reply.umsUser.name}}：</span>
                                  <span>
                                    <span v-if="reply.isReplyTwo" class="ccou-reply-content-wrapper">
                                      <span style="font-size: 13px">回复</span>
                                      <span class="ccou-reply-name">@{{reply.replyName}}: </span>
                                    </span>
                                    <span>{{reply.content}}</span>
                                  </span>
                                  <span>
                                    <el-button
                                      type="text"
                                      style="margin-left: 10px;padding: 0 0"
                                      @click="showReplyModel(2,index,rindex)">回复
                                    </el-button>
                                  </span>
                                </div>
                                <div class="ccou-time-wrapper">
                                  <div class="ccou-time">
                                    {{reply.cusCreateTime}}
                                  </div>
                                </div>
                                <!--回复框2-->
                                <div v-if="reply.isShowRelpy" class="comment-reply2-model-wrapper">
                                  <div class="comment-reply2-input-wrapper">
                                    <el-input
                                      :id="'textareaReply2'+rindex"
                                      type="textarea"
                                      v-model="replyCommentValue"
                                      :rows="direction === 'btt'?1:2"
                                      maxlength="255"
                                      show-word-limit
                                      @blur="blurTrigger"
                                      placeholder="填写您的回复...">
                                    </el-input>
                                  </div>
                                  <div class="comment-reply2-input-button-wrapper">
                                    <el-popover placement="bottom-start" width="320" trigger="click" class="emojiBox"
                                                @show="replyShowEmojiPopover">
                                      <div class="emotionList">
                                        <a href="javascript:void(0);" @click="getReplyEmoji(2,rindex,index3)"
                                           v-for="(item3,index3) in faceList"
                                           :key="index3" class="emotionItem">{{item3}}</a>
                                      </div>
                                      <img slot="reference" class="comment-reply2-input-emoji"
                                           src="@/assets/images/comment-emoji.png"
                                           width="20" height="20">
                                    </el-popover>
                                    <el-button
                                      class="comment-reply2-input-button"
                                      type="success"
                                      @click="replyCommentHandler(
                                      reply.userId,
                                      reply.createTime,
                                      reply.umsUser.name,
                                      comment.rowId)">
                                      回复
                                    </el-button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div style="clear: both;"></div>
                          </div>
                          <!--每一条评论分割线-->
                          <hr style="border:none;border-bottom: 1px solid #e4e4e4;margin-top: 16px">
                        </div>
                      </div>
                    </div>
                  </el-drawer>
                </div>
                <!--播放量-->
                <div class="play div-threeIcon">
                  <svg-icon class="threeIcon" icon-class="play-count"></svg-icon>
                  <span>{{scope.row.bbsMusicOperation.playCount === null?bbsMusic.playCount:scope.row.bbsMusicOperation.playCount}}</span>
                  <el-divider direction="vertical"></el-divider>
                </div>
                <!--点赞-->
                <div ref="likeRef" class="like div-threeIcon"
                     @click="likeHandler(scope.row.id,scope.$index,scope.row.bbsMusicOperation.isLike)"
                     style="width: auto;float: right;margin-top: 40px">
                  <svg-icon class="threeIcon" icon-class="like"
                            :style="scope.row.bbsMusicOperation.isLike?likeStyle:''"></svg-icon>
                  <br v-if="isMobile"/>
                  <span>{{scope.row.bbsMusicOperation.likeCount === null?bbsMusic.likeCount:scope.row.bbsMusicOperation.likeCount}}</span>
                  <el-divider v-if="!isMobile" direction="vertical"></el-divider>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </ul>
      <div v-if="loading" align="center" style="padding-bottom: 100px;color: white">加载中...</div>
    </div>
  </div>
</template>

<script>
  import {getRecommendList} from "@/api/bbsMusic";
  import {videoPlayer} from 'vue-video-player'
  import CollectModel from '@/components/CollectModel'
  import {addCollect} from "@/api/collect";
  import {mapGetters} from 'vuex'
  import {getMyMusicList} from "@/api/bbsMusic";
  import {like} from "@/api/like";
  import {
    userComment,
    replyuserComment,
    getUserByComment,
    getCommentByMusic
  } from "@/api/comment";

  const appData = require("@/assets/json/emoji.json");

  const defaultBbsMusic = {
    likeCount: 0,
    playCount: 0,
    commentCount: 0,
    total: 300
  }
  export default {
    name: "home",
    components: {
      videoPlayer,
      CollectModel
    },
    data() {
      return {
        pageSize: 0,
        loading: false,
        bbsMusic: Object.assign({}, defaultBbsMusic),
        list: [],
        musicId: '',
        userLikeIndex: null,
        voiceValue: 50,
        currentCommentValueLength: 0,
        commentValue: '',
        replyCommentValue: '',
        replyCurrentSelectionStart: 0,
        replyCurrentSelectionEnd: 0,
        faceList: [],
        drawer: false,
        isShowEmojiModel: false,
        userAvatarUrl: '',
        isHaveUserComment: false,
        commentList: [],
        musicIndex: null,
        commentIndex: null,
        replyCommentIndex: null,
        isShowRelpy: false,
        changeVoiceIcon: 'audio-voice',
        prevAudioVueComponent: {},
        playerOptions: {
          // videojs options
          muted: false,
          language: 'zh-CN',
          preload: 'auto',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          fluid: true,
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          }],
          poster: require("@/assets/images/1.jpg"),
        },
        isShowCollectModel: false
      }
    },
    computed: {
      disabled() {
        return this.loading
      },
      player() {
        return this.$refs.videoPlayer.player
      },
      volume() {
        return this.voiceValue / 100
      },
      ...mapGetters([
        'userInfo',
        'device',
        'userCommentInfo'
      ]),
      likeStyle() {
        return {
          color: '#fe0000'
        }
      },
      direction() {
        if (this.device !== 'mobile') {
          return 'rtl'
        } else {
          return 'btt'
        }
      },
      isMobile() {
        if (this.device === 'mobile') {
          return true
        } else {
          return false
        }
      }
    },
    watch: {},
    methods: {
      addFavoriteHandler() {
        addCollect(8, this.musicId).then(response => {
          console.log(response);
        })
      },
      //获得默认推荐音乐片段
      recommendList() {
        getRecommendList(false).then(response => {
          console.log(response);
          let data = response.data;
          this.list = data.bbsMusic
          this.list.forEach((list, index) => {
            if (list.bbsMusicOperation === null)
              this.list[index].bbsMusicOperation = {likeCount: 0, commentCount: 0, isLike: false}
            if (list.bbsUserLikeList.length !== 0) {
              list.bbsUserLikeList.forEach((userLike, index2) => {
                if (userLike.userId === this.userInfo.id) {
                  this.list[index].bbsMusicOperation.isLike = userLike.isLike
                }
              })
            }
          })
        })
      },
      //当滚动条到达最底端的时候加载新内容
      load() {
        // 滚动条到最顶端的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 判断是否到达底部
        if (Math.ceil(scrollTop) + windowHeight == scrollHeight) {
          this.loading = true
          setTimeout(() => {
            this.pageSize += 2
            this.loading = false
          }, 2000)
        }
      },
      changeVolume() {
        this.$qlAudio.volume = this.volume
        localStorage.setItem("volume", this.volume)
      },
      //声音处理
      voiceHandler() {
        let audio = this.$qlAudio
        //muted为true为静音
        if (audio.muted) {
          this.changeVoiceIcon = 'audio-voice'
          audio.muted = false
        } else {
          this.changeVoiceIcon = 'audio-voice-no'
          audio.muted = true
        }
        localStorage.setItem("muted", audio.muted)
      },
      //点击名称查看用户发表的音乐等
      seeUserSendMusic(userId, uniqueId) {
        let routeUrl = this.$router.resolve({
          path: uniqueId,
          query: {id: userId, uniqueId: uniqueId}
        })
        if (this.$route.meta.isLevel === routeUrl.resolved.meta.isLevel) {
          window.open(routeUrl.href, '_self');
        } else {
          window.open(routeUrl.href, '_blank');
        }
      },
      //点赞
      likeHandler(musicId, index, isLike) {
        if (this.userInfo === undefined || this.userInfo === '' || this.userInfo === null) {
          document.getElementById("no-login-btn").click()
        } else {
          like({
            musicId: musicId,
            userId: this.userInfo.id,
            isLike: !isLike
          }, false).then(response => {
            console.log(response);
            if (!isLike) {
              this.list[index].bbsMusicOperation.likeCount++
              this.list[index].bbsMusicOperation.isLike = true
            } else {
              this.list[index].bbsMusicOperation.likeCount--
              this.list[index].bbsMusicOperation.isLike = false
            }
            this.recommendList()
          })
        }
      },
      //获取子组件传来的实例
      setPlayEffect(vueComponent) {
        this.prevAudioVueComponent = vueComponent
      },
      //点击表情文本框focus触发
      showEmojiPopover(refname) {
        this.$refs[refname].focus()
      },
      //点击回复表情文件筐focus触发
      replyShowEmojiPopover() {

      },
      blurTrigger(event) {
        this.replyCurrentSelectionStart = event.target.selectionStart
        this.replyCurrentSelectionEnd = event.target.selectionEnd
      },
      inputTrigger(event) {
      },
      //获取表情
      getEmoji(index) {
        this.$refs.textareaRef.focus()
        //获取当前光标位置的值
        let currentPostion = this.$refs.textareaRef.$refs.textarea.selectionStart;
        let endPostion = this.$refs.textareaRef.$refs.textarea.selectionEnd;
        if (currentPostion === undefined || endPostion === undefined) return
        let value = this.commentValue
        // 非IE浏览器
        if (window.getSelection) {
          this.commentValue = value.substring(0, currentPostion) + this.faceList[index] + value.substring(endPostion)
          this.$refs.textareaRef.$refs.textarea.selectionStart += this.faceList[index].length
          // this.$refs.textareaRef.focus()
        }
        // IE浏览器
        else if (document.selection) {
        }
        this.currentCommentValueLength = this.$refs.textareaRef.$refs.textarea.selectionStart
        console.log(this.$refs.textareaRef);
        return;
      },
      getReplyEmoji(prefix, index, index2) {
        let textareaReply = document.getElementById("textareaReply" + prefix + index)
        //获取当前光标位置的值
        let currentPostion = textareaReply.selectionStart = this.replyCurrentSelectionStart;
        let endPostion = textareaReply.selectionEnd = this.replyCurrentSelectionEnd;
        if (currentPostion === undefined || endPostion === undefined) return
        let value = this.replyCommentValue
        // 非IE浏览器
        if (window.getSelection) {
          this.replyCommentValue = value.substring(0, currentPostion) + this.faceList[index2] + value.substring(endPostion)
          textareaReply.selectionStart += this.faceList[index2].length
          // this.$refs.textareaRef.focus()
        }
        // IE浏览器
        else if (document.selection) {
        }
        return;
      },
      //评论窗口关闭回调
      drawerCloseTrigger() {
        this.commentValue = ''
        this.replyCommentValue = ''
      },
      //获取对应音乐id的评论
      commentByMusic(musicId) {
        getCommentByMusic({musicId: musicId}, false).then(response => {
          console.log(response);
          this.commentList = response.data
        })
      },
      //打开评论窗口(进行赋值)
      openCommentModel(musicId, bbsUserCommentList, musicIndex) {
        this.drawer = true
        //将打开的音乐id赋值
        this.musicId = musicId
        //将打开的音乐索引位置赋值
        this.musicIndex = musicIndex
        if (bbsUserCommentList.length !== 0) {
          bbsUserCommentList.forEach((comment, index) => {
            comment.userLike = false
            comment.cusCreateTime = this.timeFormatToCAE(comment.createTime)
            if (comment.bbsReplyuserCommentList !== undefined) {
              comment.bbsReplyuserCommentList.forEach((reply2, index2) => {
                comment.userLike = false
                reply2.cusCreateTime = this.timeFormatToCAE(reply2.createTime)
                if (comment.userId !== reply2.replyuserId) {
                  comment.bbsReplyuserCommentList.forEach((reply3, index3) => {
                    if (reply2.replyuserId === reply3.userId) {
                      this.$set(reply2, "isReplyTwo", true)
                      this.$set(reply2, "replyName", reply3.umsUser.name)
                    }
                    else
                      this.$set(reply2, "isReplyTwo", false)
                  })
                }
              })
            }
          })
        }
        this.commentList = bbsUserCommentList
        console.log(bbsUserCommentList);
      },
      //发表评论
      sendCommentHandler() {
        if (this.commentValue === '') {
          this.$tip.error("评论内容不能为空")
        } else if (this.userInfo === undefined || this.userInfo === '' || this.userInfo === null) {
          document.getElementById("no-login-btn").click()
        } else {
          let umsUser = this.userInfo
          umsUser.createTime = new Date(umsUser.createTime)
          userComment({
            userId: this.userInfo.id,
            musicId: this.musicId,
            content: this.commentValue,
            umsUser: umsUser
          }, false).then(response => {
            console.log(response);
            if (response !== undefined) {
              //第一个参数：添加的位置，第二个：删除数量，第三个，元素
              this.commentList.splice(0, 0, {
                umsUser: umsUser,
                content: this.commentValue,
                cusCreateTime: "刚刚"
              })
              this.recommendList()
              this.commentValue = ''
              this.list[this.musicIndex].bbsMusicOperation.commentCount++
              this.$tip.success("评论成功")
            }
          })
        }
      },
      //点击回复显示回复框
      showReplyModel(order, index, rindex) {
        this.commentList.forEach((comment, cindex) => {
          if (index !== cindex) {
            this.$set(comment, "isShowRelpy", false)
            comment.bbsReplyuserCommentList.forEach((reply) => {
              this.$set(reply, "isShowRelpy", false)
            })
          } else {
            if (rindex === '') {
              if (!comment.isShowRelpy) {
                this.$set(comment, "isShowRelpy", true)
              }
              comment.bbsReplyuserCommentList.forEach((reply) => {
                this.$set(reply, "isShowRelpy", false)
              })
            } else {
              this.$set(comment, "isShowRelpy", false)
              comment.bbsReplyuserCommentList.forEach((reply2, rindex2) => {
                if (rindex === rindex2) {
                  if (!reply2.isShowRelpy) {
                    this.$set(reply2, "isShowRelpy", true)
                    this.replyCommentValue = ''
                  }
                } else {
                  this.$set(reply2, "isShowRelpy", false)
                }
              })
            }
          }
        })
        this.commentIndex = index
        this.replyCommentIndex = rindex
      },
      //隐藏回复评论窗口
      hideReplyModel(index) {
        if (this.commentList.length !== 0 || this.commentList !== null) {
          this.commentList.forEach((comment, cindex) => {
            if (this.commentIndex !== null && index !== this.commentIndex) {
              this.$set(this.commentList[cindex], "isShowRelpy", false)
              this.commentList[cindex].bbsReplyuserCommentList.forEach((reply, rindex) => {
                this.$set(reply, "isShowRelpy", false)
              })
            }
          })
        }
      },
      //回复评论
      replyCommentHandler(replyuserId, replyuserCreateTime, replyName, rowId) {
        if (this.replyCommentValue === '') {
          this.$tip.error("评论内容不能为空")
        } else if (this.userInfo === undefined || this.userInfo === '' || this.userInfo === null) {
          document.getElementById("no-login-btn").click()
        } else {
          let umsUser = this.userInfo
          umsUser.createTime = new Date(umsUser.createTime)
          replyuserComment({
            userId: this.userInfo.id,
            replyuserId: replyuserId,
            musicId: this.musicId,
            rowId: rowId,
            content: this.replyCommentValue,
            replyuserCreateTime: replyuserCreateTime,
            umsUser: umsUser
          }, false).then(response => {
            console.log(response);
            if (response !== undefined) {
              this.recommendList()
              //如果是子回复
              if (this.replyCommentIndex !== '') {
                this.commentList[this.commentIndex].bbsReplyuserCommentList.splice(this.commentList[this.commentIndex].bbsReplyuserCommentList.length, 0, {
                  content: this.replyCommentValue,
                  cusCreateTime: "刚刚",
                  umsUser: umsUser,
                  replyName: replyName,
                  isReplyTwo: true
                })
              } else {
                //第一个参数：添加的位置，第二个：删除数量，第三个，元素
                this.commentList[this.commentIndex].bbsReplyuserCommentList.splice(0, 0, {
                  content: this.replyCommentValue,
                  createTime: "刚刚",
                  umsUser: umsUser,
                  isReplyTwo: false
                })
              }
              this.recommendList()
              this.replyCommentValue = ''
              this.$set(this.commentList[this.commentIndex], "isShowRelpy", false)
              this.commentList[this.commentIndex].bbsReplyuserCommentList.forEach((reply, rindex) => {
                this.$set(reply, "isShowRelpy", false)
              })
              this.list[this.musicIndex].bbsMusicOperation.commentCount++
              this.$tip.success("回复成功")
            }
          })
        }
      },
      //查看音乐完整内容
      seeMusicContent(id) {
        // let routeUrl = this.$router.resolve({
        //   path: id,
        //   query:{id:userId,uniqueId:uniqueId}
        // })
        // if (this.$route.meta.isLevel === routeUrl.resolved.meta.isLevel) {
        //   window.open(routeUrl.href, '_self');
        // } else {
        //   window.open(routeUrl.href, '_blank');
        // }
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event
      onPlayerCanplay(player) {
        // console.log('player canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player canplaythrough!', player)
      },

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        // console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    },
    created() {
      this.recommendList()
      if (this.bbsMusic.total < 15)
        this.pageSize = this.bbsMusic.total
      else
        this.pageSize = 15
      //初始化audio
      this.initAudio()
    },
    mounted() {
      //初始化音量图标
      let muted = localStorage.getItem("muted")
      console.log(muted);
      if (muted === 'true') {
        this.changeVoiceIcon = 'audio-voice-no'
      } else {
        this.changeVoiceIcon = 'audio-voice'
      }
      //初始化音量滑条
      console.log("音量：" + localStorage.getItem("volume") * 100);
      this.voiceValue = localStorage.getItem("volume") * 100

      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }

      this.$nextTick(function () {
        window.addEventListener('scroll', this.load, true)
      })

    },
    destroyed() { //离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.load)
    },
  }
</script>

<style lang="scss">
  .el-popover {
    height: 200px;
    overflow: scroll;
    overflow-x: auto;
  }
</style>
<style lang="scss" scoped>
  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid red;
  }

  //emoji表情包
  .emotionList {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
  }

  .emotionItem {
    width: 10%;
    font-size: 20px;
    text-align: center;
  }

  //评论抽屉框
  .comment-drawer {
    .el-drawer__header {
      font-size: 18px;
    }
    .comment-wrapper {
      height: 100%;
      //发表评论框
      .comment-model-wrapper {
        .comment-input-wrapper {
          margin-top: -12px;
          padding: 0px 20px;
        }
        .comment-input-button-wrapper {
          float: right;
          margin-top: 10px;
          margin-right: 20px;
          .comment-input-button {
            padding: 7px 1.5vw;
          }
          .comment-input-emoji {
            float: left;
            margin-top: 3px;
            margin-right: 13px;
          }
          .comment-input-emoji:hover {
            cursor: pointer;
          }
        }
      }
      .comment-empty-wrapper {
        margin-top: 15px;
        text-align: center;
      }
      .comment-content-wrapper {
        margin-top: -10px;
        padding: 5px 20px;
        .comment-content-title {

        }
        .comment-content-row-wrapper {
          .cc-avatar-wrapper {
            padding-top: 5px;
            margin-top: 10px;
            margin-bottom: 5px;
            .cc-avatar {
              float: left;
            }
            .cc-avatar:hover {
              cursor: pointer;
            }
            .cc-name-wrapper {
              margin-left: 42px;
              margin-top: -2px;
              width: auto;
              width: fit-content;
              width: -moz-fit-content;
              word-wrap: break-word;
              .cc-content {
              }
              .cc-name {
                color: #fe0000;
                font-size: 14px;
                margin-top: -3px;
              }
            }
            .cc-time-wrapper {
              margin-left: 44px;
              .cc-time {
                font-size: 11px;
                color: #777777;
              }
            }
            //回复评论框
            .comment-reply-model-wrapper {
              .comment-reply-input-wrapper {
                padding: 3px 0 0 40px;
              }
              .comment-reply-input-button-wrapper {
                float: right;
                margin-top: 10px;
                margin-bottom: 10px;
                .comment-reply-input-button {
                  padding: 5px 1vw;
                }
                .comment-reply-input-emoji {
                  float: left;
                  margin-top: 2px;
                  margin-right: 10px;
                }
                .comment-reply-input-emoji:hover {
                  cursor: pointer;
                }
              }
            }
          }
          .cc-open-other-user-wrapper {
            .cc-open-other-user {
              padding: 0 60px;
              margin-top: -10px;
            }
          }
          .cc-other-user-wrapper {
            margin-top: 15px;
            margin-left: 20px;
            padding-left: 10px;
            border-left: 1px solid #e4e4e4;
            .ccou-content-row-wrapper {
              width: 100%;
              margin-top: 5px;
              /*height: 46px;*/
              .ccou-content-wrapper {
                padding-top: 3px;
                .ccou-avatar {
                  float: left;
                }
                .ccou-avatar:hover {
                  cursor: pointer;
                }
                .ccou-name-wrapper {
                  margin-left: 38px;
                  width: auto;
                  width: fit-content;
                  width: -moz-fit-content;
                  word-wrap: break-word;
                  margin-top: -3px;
                  .ccou-name {
                    color: #fe0000;
                    font-size: 13px;
                  }
                  .ccou-reply-content-wrapper {
                    .ccou-reply-name {
                      font-size: 13px;
                      color: #8c939d;
                    }
                    .ccou-reply-name:hover {
                      cursor: pointer;
                    }
                  }
                }
                .ccou-time-wrapper {
                  margin-top: -2px;
                  margin-left: 40px;
                  .ccou-time {
                    font-size: 10px;
                    color: #777777;
                  }
                }
                //回复评论框2
                .comment-reply2-model-wrapper {
                  .comment-reply2-input-wrapper {
                    padding: 3px 0 0 40px;
                  }
                  .comment-reply2-input-button-wrapper {
                    float: right;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    .comment-reply2-input-button {
                      padding: 3px 0.5vw;
                    }
                    .comment-reply2-input-emoji {
                      float: left;
                      margin-top: 1px;
                      margin-right: 8px;
                    }
                    .comment-reply2-input-emoji:hover {
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
