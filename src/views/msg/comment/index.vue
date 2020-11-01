<template>
  <div id="msg-comment">
    <div class="msg-comment-wrapper">
      <div
        class="msg-comment"
        v-for="(msgComment, index) in msgCommentList"
        :key="msgComment.id"
        :label="msgComment.id">
        <img v-if="msgComment.isShowMsgNewImg" class="msg-comment-new-img" src="@/assets/images/msg-new.gif" width="40">
        <div v-else :class="$route.query.noSeeMsgIdStr !== ''?'msg-comment-new-img-empty':'msg-comment-new-img-empty-all'"></div>
        <el-card
          :body-style="{padding:'10px 0 0 0',height:'85px'}"
          shadow="hover"
          class="msg-comment-card">
          <div class="msg-comment-row-wrapper">
            <div class="mc-user-wrapper">
              <div class="mc-user-avatar">
                <el-avatar :size=32 :src="msgComment.umsUserInfo.avatar"></el-avatar>
              </div>
              <div :style="device === 'mobile'?{float:'left',width:'180px',lineHeight:'18px'}:{float:'left'}">
                <div class="mc-user-name">
                  <span style="color: #fe0000;">{{msgComment.umsUserInfo.name}}</span>
                  <span style="margin-left: 10px">评论了你</span>
                  <span
                    style="margin-left: 10px;color: #888888;font-size: 10px">{{msgComment.createTime | timeFormat}}</span>
                </div>
                <div class="mc-user-content">{{msgComment.content}}</div>
              </div>
            </div>
            <div class="mc-audio-wrapper">
              <img class="mc-audio-img" :src="msgComment.bbsMusic.audioAvatarUrl">
              <el-popconfirm
                icon="el-icon-info"
                iconColor="red"
                title="这段内容确定取消收藏吗？"
                confirmButtonType="danger"
                cancelButtonType="success"
                @onConfirm="deleteMsgCommentHandler()">
                <div class="mc-del-button" slot="reference">
                  <img src="@/assets/images/msg-delete.png" width="20" height="20">
                </div>
              </el-popconfirm>
              <div class="mc-audio-title">{{msgComment.bbsMusic.title | titleFormat}}</div>
            </div>
          </div>
        </el-card>
      </div>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination
          @current-change="currentChangeHanlder"
          :hide-on-single-page="false"
          layout="prev,pager,next"
          :page-size="10"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {msgCommentList, msgReplyList, updateNoSeeMsgCommentCount} from "@/api/comment";

  const defaultMsgCommentQuery = {
    pageNum: 1,
    pageSize: 10
  }

  export default {
    name: "msgComment",
    data() {
      return {
        msgCommentQuery: Object.assign({}, defaultMsgCommentQuery),
        total: null,
        msgCommentList: []
      }
    },
    computed: {
      device() {
        return this.$store.state.app.device
      },
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      getMsgCommentList() {
        msgCommentList(this.msgCommentQuery, this.userInfo.id, true).then(response => {
          console.log(response);
          let data = response.data
          this.msgCommentList = data.list
          this.total = data.total
          var split = this.$route.query.noSeeMsgIdStr.split(':');
          this.msgCommentList.forEach((item1, index1) => {
            item1.isShowMsgNewImg = false
            if(this.$route.query.noSeeMsgIdStr !== ''){
              split.forEach((item2,index2) => {
                if(item1.id === parseInt(item2)){
                  this.$set(item1,'isShowMsgNewImg',true)
                  // //更新未读消息提示
                  this.updateNoSeeMsgCommentHandler()
                }
              })
            }
          })
        })
      },
      //获取评论回复的消息
      getMsgReplyList() {
        msgReplyList(this.userInfo.id, true).then(response => {
          // console.log(response);
          let data = response.data

        })
      },
      //删除消息
      deleteMsgCommentHandler() {
      },
      //更新未读消息提示
      updateNoSeeMsgCommentHandler() {
        updateNoSeeMsgCommentCount(this.userInfo.id).then(response => {})
      },
      currentChangeHanlder(pageNum) {
        this.msgCommentQuery.pageNum = pageNum
        this.getMsgCommentList()
      }
    },
    filters: {
      titleFormat(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
          var c = val.charCodeAt(i);
          //单字节加1
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
          }
          else {
            len += 2;
          }
        }
        if (len > 12) return val.substring(0, 6) + "..."
        else return val
      },
      timeFormat(val) {
        return new Date(+new Date(val) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      }
    },
    created() {
      //初始化回复消息
      this.getMsgCommentList()
      this.getMsgReplyList()
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  #msg-comment {
    .msg-comment-wrapper {
      padding: 0 30px 0 0;
      .msg-comment {
        .msg-comment-new-img{
          float: left;
          margin-right: 20px;
        }
        .msg-comment-new-img-empty{
          width: 40px;
          height: 40px;
          float: left;
          margin-right: 20px;
        }
        .msg-comment-new-img-empty-all{
          width: 10px;
          height: 40px;
          float: left;
          margin-right: 20px;
        }
        .msg-comment-card {
          margin-top: 10px;
          border: 1px solid #d9d9d9;
          .msg-comment-row-wrapper {
            .mc-user-wrapper {
              width: 43vw;
              float: left;
              margin-left: 14px;
              .mc-user-avatar {
                float: left;
                width: 40px;
              }
              .mc-user-name {
                font-size: 13px;
                margin-left: 5px;
              }
              .mc-user-content {
                margin-top: 5px;
                margin-left: 5px;
                width: auto;
                width: fit-content;
                width: -moz-fit-content;
                word-wrap: break-word;
                margin-bottom: 10px;
                font-size: 15px;
              }
            }
            .mc-audio-wrapper {
              float: left;
              width: 140px;
              height: 52px;
              padding-left: 1.4vw;
              .mc-audio-img {
                width: 43px;
                height: 43px;
                border-radius: 50%;
                cursor: pointer;
                float: left;
              }
              .mc-del-button {
                float: left;
                margin-left: 40px;
                margin-top: 10px;
                cursor: pointer;
              }
              .mc-audio-title {
                clear: both;
                height: 23px;
                overflow-y: hidden;
                padding-top: 6px;
                font-weight: bold;
                color: #555555;
                font-size: 14px;
              }
            }

          }
        }
      }
      .pagination-wrapper {
        text-align: center;
        margin-top: 30px;
      }
    }
  }
</style>
