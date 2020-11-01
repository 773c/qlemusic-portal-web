<template>
  <div id="home">
    <!-- 阴影背景层 -->
    <collect-model :isShowCollectModel="isShowCollectModel" @addFavoriteHandler="addFavoriteHandler"></collect-model>
    <!--音频文章区域-->
    <div class="infinite-list-wrapper middle-bbs-music-wrapper">
      <ul class="list">
        <!--<div v-show="drawer" @touchmove.prevent @mousewheel.prevent style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:1511;background-color: rgba(0,0,0,0.5)">-->
        <!--</div>-->
        <el-table ref="bbsMusicTable" border :data="list" :style="{height:scrollHeightMobile+'px'}">
          <template slot="empty">
            <div v-loading="initLoading" style="height:200px;z-index: 1"></div>
          </template>
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
                  <avatar-popover
                    :avatarUrl="scope.row.umsUserInfo.avatar"
                    :name="scope.row.umsUserInfo.name">
                  </avatar-popover>
                </div>
                <!--名称-->
                <div class="bbsm-row-name-wrapper"
                     @click="seeUserSendMusic(scope.row.umsUserInfo.id,scope.row.umsUserInfo.uniqueId)">
                  <div class="publisher">{{scope.row.umsUserInfo.name | nameFormat(isMobile)}}</div>
                </div>
                <!--播放器-->
                <div class="bbsm-row-audio-wrapper">
                  <ql-audio
                    ref="qlAudioRef"
                    :audioUrl="scope.row.audioUrl"
                    :audioImgUrl="scope.row.audioAvatarUrl"
                    :musicId="scope.row.id"
                    :startTime="scope.row.startTime"
                    :playTime="scope.row.playTime"
                    :isShowLineProgress="false"
                    :prevAudioVueComponent="prevAudioVueComponent"
                    @setPlayEffect="setPlayEffect">
                  </ql-audio>
                </div>
                <!--移动端播放量-->
                <div v-if="isMobile" class="play-text-wrapper">
                  <span>播放量 </span>
                  <span style="color: #fe0000">{{
                    scope.row.bbsMusicOperation.playCount === null
                    ? bbsMusic.playCount
                    : scope.row.bbsMusicOperation.playCount}}
                  </span>
                </div>
                <!--评论-->
                <div class="comment div-threeIcon"
                     @click="openCommentModel(scope.row.id,scope.row.umsUserInfo.id,scope.row.bbsUserCommentList,scope.$index,scope.row.bbsMusicOperation.commentCount)">
                  <svg-icon class="threeIcon" icon-class="comment"></svg-icon>
                  <br v-if="device==='mobile'?true:false"/>
                  <span>{{scope.row.bbsMusicOperation.commentCount === null?0:scope.row.bbsMusicOperation.commentCount}}</span>
                </div>
                <!--播放量-->
                <div class="play div-threeIcon">
                  <svg-icon class="threeIcon" icon-class="play-count" style="width: 20px"></svg-icon>
                  <span>
                    {{scope.row.bbsMusicOperation.playCount === null
                    ? bbsMusic.playCount
                    : scope.row.bbsMusicOperation.playCount}}
                  </span>
                  <el-divider direction="vertical"></el-divider>
                </div>
                <!--点赞-->
                <div ref="likeRef" class="like div-threeIcon"
                     @click="likeHandler(scope.row.id,scope.$index,scope.row.bbsMusicOperation.isLike)"
                     style="width: auto;float: right;margin-top: 40px">
                  <svg-icon
                    class="threeIcon"
                    :icon-class="scope.row.bbsMusicOperation.isLike === true?'like-count-full':'like-count'"
                    style="width: 22px"
                    :class="scope.row.bbsMusicOperation.isLike === true?'animate':''"
                    :style="scope.row.bbsMusicOperation.isLike?likeStyle:''"></svg-icon>
                  <br v-if="isMobile"/>
                  <span>
                    {{scope.row.bbsMusicOperation.likeCount === null
                    ? bbsMusic.likeCount
                    : scope.row.bbsMusicOperation.likeCount}}
                  </span>
                  <el-divider v-if="!isMobile" direction="vertical"></el-divider>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--评论抽屉drawer框-->
        <div class="bbsm-row-comment-drawer-wrapper" @click="hideReplyModel('')">
          <el-drawer
            :title="'评论（'+bbsMusic.commentCount+'）'"
            class="comment-drawer"
            :visible.sync="drawer"
            :modal="false"
            :modal-append-to-body="true"
            :direction="direction"
            :size="direction === 'btt'?'60%':'35%'"
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
                  <el-popover placement="bottom-start" width="350" trigger="click" popper-class="emojiBox"
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
                      <el-avatar :size=34 :src="comment.umsUserInfo.avatar"></el-avatar>
                    </div>
                    <div class="cc-name-wrapper">
                      <span class="cc-name">{{comment.umsUserInfo.name}}</span>
                      <div class="cc-content">
                        {{comment.content}}
                        <span><el-button
                          class="cc-button"
                          type="text"
                          style="margin-left: 10px;padding: 0 0;"
                          @click="showReplyModel(1,index,'')">回复</el-button>
                      </span>
                      </div>
                    </div>
                    <div class="cc-time-wrapper">
                      <div class="cc-time">{{comment.cusCreateTime}}</div>
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
                        <el-popover placement="bottom-start" width="350" trigger="click" popper-class="emojiBox"
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
                                   @click="replyCommentHandler(comment.userId,comment.createTime,'',comment.id)">
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
                          <el-avatar :size=30 :src="reply.umsUserInfo.avatar"></el-avatar>
                        </div>
                        <div class="ccou-name-wrapper">
                          <span class="ccou-name">{{reply.umsUserInfo.name}} </span>
                          <span>
                            <span v-if="reply.isReplyTwo" class="ccou-reply-content-wrapper">
                              <span style="font-size: 13px">回复</span>
                              <span class="ccou-reply-name">@{{reply.replyName}}</span>
                            </span>
                            <div class="ccou-content">
                              {{reply.content}}
                              <span>
                              <el-button type="text" style="margin-left: 10px;padding: 0 0;font-size: 13px"
                                       @click="showReplyModel(2,index,rindex)">回复</el-button></span>
                            </div>
                          </span>
                        </div>
                        <div class="ccou-time-wrapper">
                          <div class="ccou-time">{{reply.cusCreateTime}}</div>
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
                            <el-popover placement="bottom-start" width="320" trigger="click"
                                        popper-class="emojiBox"
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
                              @click="replyCommentHandler(reply.userId,reply.createTime,reply.umsUserInfo.name,comment.id)">
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
      </ul>
      <div align="center" class="list-bottom-wrapper">
        <div v-if="!isEmptyList">
          <div v-if="device === 'mobile' && !loading" class="list-bottom-mobile-wrapper" @click="showMoreMusic">
            <div style="border-top: 1px solid #d3d4d6;width: 60px;float: left"></div>
            <div style="float: left;margin: -8px 0 0 16px;font-size: 13px;color: #999999">展开更多<i
              class="el-icon-caret-bottom" style="color: #bbbbbb"></i></div>
            <div style="border-top: 1px solid #d3d4d6;width: 60px;float: right;"></div>
          </div>
          <div class="list-bottom-loading" v-loading="loading"></div>
        </div>
        <div v-else class="list-bottom-empty-wrapper">
          <div class="list-bottom-empty-text">到底了...</div>
          <img class="list-bottom-empty-img" src="@/assets/images/arrive-bottom.gif" height="70">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {recommendList} from '@/api/bbsMusic';
  import CollectModel from '@/components/CollectModel'
  import {addCollect} from '@/api/collect';
  import {mapGetters} from 'vuex'
  import {like} from '@/api/like';
  import {userComment, replyuserComment, commentList} from "@/api/comment";
  import AvatarPopover from '@/components/AvatarPopover'

  const appData = require("@/assets/json/emoji.json");

  const defaultBbsMusic = {
    pageNum: 1,
    pageSize: 10,
    likeCount: 0,
    playCount: 0,
    commentCount: 0
  }
  export default {
    name: "home",
    components: {
      CollectModel,
      AvatarPopover
    },
    data() {
      return {
        initLoading: false,
        loading: false,
        bbsMusic: Object.assign({}, defaultBbsMusic),
        list: [],
        listLength: 0,
        isEmptyList: false,
        musicId: null,
        releaseUserId:null,
        musicIndex: null,
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
        commentIndex: null,
        replyCommentIndex: null,
        isShowRelpy: false,
        changeVoiceIcon: 'audio-voice',
        prevAudioVueComponent: {},
        isShowCollectModel: false,
        total: null,
        scrollHeight: 1152
      }
    },
    computed: {
      device() {
        return this.$store.state.app.device
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
        if (this.device !== 'mobile') return 'rtl'
        else return 'btt'
      },
      isMobile() {
        if (this.device === 'mobile') return true
        else return false
      },
      scrollHeightMobile() {
        if (this.device !== 'mobile') return this.scrollHeight
        else return this.scrollHeight + 233
      }
    },
    methods: {
      addFavoriteHandler() {
        addCollect(8, this.musicId).then(response => {
          console.log(response);
        })
      },
      //获得默认推荐音乐片段
      getRecommendList() {
        recommendList({pageNum: this.bbsMusic.pageNum, pageSize: this.bbsMusic.pageSize}, false).then(response => {
          console.log(response);
          this.loading = false
          let data = response.data;
          data.list.forEach((item, index) => {
            this.list.splice(this.listLength++, 0, item)
          })
          this.list.forEach((list, index) => {
            if (list.bbsUserLikeList.length !== 0) {
              list.bbsUserLikeList.forEach((userLike, index2) => {
                if (userLike.userId === this.userInfo.id) this.list[index].bbsMusicOperation.isLike = userLike.isLike
              })
            }
          })
          this.total = data.total
          this.initLoading = false
          if (this.bbsMusic.pageNum !== 1) {
            if (this.device !== 'mobile') {
              if (this.bbsMusic.pageNum * this.bbsMusic.pageSize > this.total) this.scrollHeight += data.list.length * 110.3
              else this.scrollHeight += 1103
            } else {
              if (this.bbsMusic.pageNum * this.bbsMusic.pageSize > this.total) this.scrollHeight += data.list.length * 134.1
              else this.scrollHeight += 1341
            }
          }
          window.addEventListener('scroll', this.load)
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
        // console.log(Math.floor(scrollTop) + windowHeight + "=" + scrollHeight);
        if (Math.ceil(scrollTop) + windowHeight >= scrollHeight) {
          window.removeEventListener('scroll', this.load)
          if (!this.initLoading) this.showMoreMusic()
        }
      },
      //显示更多音乐
      showMoreMusic() {
        if (this.listLength < this.total) {
          this.loading = true
          this.bbsMusic.pageNum++
          this.getRecommendList()
        } else {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.isEmptyList = true
          }, 1000)
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
          query: {uid: userId, uniqueId: uniqueId}
        })
        if (this.$route.meta.isLevel === routeUrl.resolved.meta.isLevel) window.open(routeUrl.href, '_self');
        else window.open(routeUrl.href, '_blank');
      },
      //点赞
      likeHandler(musicId, index, isLike) {
        if (this.userInfo.id === undefined || this.userInfo.id === null) {
          document.getElementById("no-login-btn").click()
        } else {
          like({musicId: musicId, userId: this.userInfo.id, isLike: !isLike}, false).then(response => {
            let data = response.data
            this.list[index].bbsMusicOperation.isLike = data.isLike
            this.list[index].bbsMusicOperation.likeCount = data.likeCount
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
        }
        // IE浏览器
        else if (document.selection) {
        }
        this.currentCommentValueLength = this.$refs.textareaRef.$refs.textarea.selectionStart
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
        }
        // IE浏览器
        else if (document.selection) {
        }
        return;
      },
      //获取对应音乐id的评论
      getCommentListByMusicId(musicId) {
        commentList(musicId, false).then(response => {
          let data = response.data
          this.setCommentListValue(data)
          this.commentList = data
        })
      },
      //设置CommentList
      setCommentListValue(bbsUserCommentList) {
        bbsUserCommentList.forEach((comment, index) => {
          comment.userLike = false
          comment.cusCreateTime = this.timeFormatToCAE(comment.createTime)
          if (comment.bbsReplyuserCommentList !== undefined) {
            comment.bbsReplyuserCommentList.forEach((reply2, index2) => {
              comment.userLike = false
              reply2.cusCreateTime = this.timeFormatToCAE(reply2.createTime)
              //判断回复的是不是主用户（也就是第一个发表评论的用户，如果是自己回自己，comment,reply2的用户，回复id都一样）
              if (comment.userId !== reply2.replyuserId || comment.createTime !== reply2.replyuserCreateTime) {
                //不是，回复的是其他用户（则判断回复的是主用户还是其他）
                comment.bbsReplyuserCommentList.forEach((reply3, index3) => {
                  //判断用户回复相等，时间相等
                  if (reply2.replyuserId === reply3.userId && reply2.replyuserCreateTime === reply3.createTime) {
                    this.$set(reply2, "isReplyTwo", true)
                    this.$set(reply2, "replyName", reply3.umsUserInfo.name)
                    return
                  }
                })
              }
            })
          }
        })
      },
      //打开评论窗口(进行赋值)
      openCommentModel(musicId,releaseUserId, bbsUserCommentList, musicIndex, commentCount) {
        this.drawer = true
        //将打开的音乐id赋值
        this.musicId = musicId
        //将打开的音乐发布者id赋值
        this.releaseUserId = releaseUserId
        //将打开的音乐索引位置赋值
        this.musicIndex = musicIndex
        //将打开的音乐评论数量赋值
        if (commentCount !== null) this.bbsMusic.commentCount = commentCount
        //获取评论用户集合
        this.getCommentListByMusicId(musicId)
      },
      //评论窗口关闭回调
      drawerCloseTrigger() {
        this.musicId = null
        this.musicIndex = null
        this.commentValue = ''
        this.replyCommentValue = ''
        this.bbsMusic.commentCount = 0
      },
      //发表评论
      sendCommentHandler() {
        if (this.commentValue === '') this.$tip.error("评论内容不能为空")
        else if (this.userInfo.id === undefined || this.userInfo.id === null) {
          this.drawer = false
          document.getElementById("no-login-btn").click()
        } else {
          let umsUserInfo = this.userInfo
          umsUserInfo.createTime = new Date(umsUserInfo.createTime)
          userComment({
            userId: this.userInfo.id,
            musicId: this.musicId,
            releaseUserId:this.releaseUserId,
            content: this.commentValue,
            umsUserInfo: umsUserInfo
          }, false).then(response => {
            this.getCommentListByMusicId(this.musicId)
            this.commentValue = ''
            this.list[this.musicIndex].bbsMusicOperation.commentCount++
            this.$tip.success("评论成功")
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
              if (!comment.isShowRelpy) this.$set(comment, "isShowRelpy", true)
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
                } else this.$set(reply2, "isShowRelpy", false)
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
        if (this.replyCommentValue === '') this.$tip.error("评论内容不能为空")
        else if (this.userInfo.id === undefined || this.userInfo.id === null) {
          this.drawer = false
          document.getElementById("no-login-btn").click()
        } else {
          let umsUserInfo = this.userInfo
          umsUserInfo.createTime = new Date(umsUserInfo.createTime)
          replyuserComment({
            userId: this.userInfo.id,
            replyuserId: replyuserId,
            musicId: this.musicId,
            rowId: rowId,
            content: this.replyCommentValue,
            replyuserCreateTime: replyuserCreateTime,
            umsUserInfo: umsUserInfo
          }, false).then(response => {
            this.getCommentListByMusicId(this.musicId)
            this.replyCommentValue = ''
            this.$set(this.commentList[this.commentIndex], "isShowRelpy", false)
            this.commentList[this.commentIndex].bbsReplyuserCommentList.forEach((reply, rindex) => {
              this.$set(reply, "isShowRelpy", false)
            })
            this.list[this.musicIndex].bbsMusicOperation.commentCount++
            this.$tip.success("回复成功")
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
      }
    },
    filters: {
      nameFormat(val, isMobile) {
        if (!isMobile) {
          if (val.length > 7) return val.substring(0, 7) + "..."
          else return val
        } else {
          if (val.length > 4) return val.substring(0, 4) + "..."
          else return val
        }
      }
    },
    created() {
      this.initLoading = true
      //获取默认音乐列表
      this.getRecommendList()
      //初始化audio
      this.initAudio()
      //初始化emoji表情
      for (let i in appData) this.faceList.push(appData[i].char);
    },
    mounted() {
      //初始化音量图标
      let muted = localStorage.getItem("muted")
      if (muted === 'true') {
        this.changeVoiceIcon = 'audio-voice-no'
      } else {
        this.changeVoiceIcon = 'audio-voice'
      }
      //初始化音量滑条
      this.voiceValue = localStorage.getItem("volume") * 100
      this.$nextTick(function () {
        window.addEventListener('scroll', this.load)
      })
    },
    //离开该页面需要移除这个监听的事件
    destroyed() {
      window.removeEventListener('scroll', this.load)
    },
  }
</script>

<style lang="scss">
  .emojiBox {
    height: 189px !important;
    overflow: scroll;
    overflow-x: auto;
  }

  .animate {
    animation: scaleDraw 2s ease-in-out;
  }

  @keyframes scaleDraw {
    0% {
      transform: scale(1); /*开始为原始大小*/
    }
    25% {
      transform: scale(1.2); /*放大1.1倍*/
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.2);
    }
  }
</style>
<style lang="scss" scoped>
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
              margin-top: -6px;
              width: auto;
              width: fit-content;
              width: -moz-fit-content;
              word-wrap: break-word;
              .cc-content {
                margin-top: 6px;
                line-height: 22px;
                font-size: 14px;
              }
              .cc-name {
                color: #fe0000;
                font-size: 14px;
                margin-top: -3px;
              }
            }
            .cc-time-wrapper {
              margin-top: 4px;
              margin-left: 43px;
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
                  padding: 6px 1.2vw;
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
            margin-top: 20px;
            margin-left: 20px;
            padding-left: 10px;
            border-left: 1px solid #e4e4e4;
            .ccou-content-row-wrapper {
              width: 100%;
              margin-top: 8px;
              /*height: 46px;*/
              .ccou-content-wrapper {
                padding-top: 10px;
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
                  margin-top: -6px;
                  .ccou-name {
                    color: #fe0000;
                    font-size: 13px;
                  }
                  .ccou-content {
                    margin-top: 5px;
                    line-height: 22px;
                    font-size: 14px;
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
                  margin-top: 4px;
                  margin-left: 39px;
                  .ccou-time {
                    font-size: 10px;
                    color: #777777;
                  }
                }
                //回复评论框2
                .comment-reply2-model-wrapper {
                  height: 80px;
                  .comment-reply2-input-wrapper {
                    padding: 3px 0 0 40px;
                  }
                  .comment-reply2-input-button-wrapper {
                    float: right;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    .comment-reply2-input-button {
                      padding: 5px 1vw;
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
