<template>
  <div id="msg-comment">
    <div class="msg-comment-wrapper">
      <div class="msg-comment">
        <el-card
          :body-style="{padding:'18px'}"
          shadow="hover"
          class="el-card-msg-comment"
          v-for="(item, index) in msgCommentList"
          :key="item.name"
          :label="item.title"
          :name="item.name">
          <span style="padding:4px 5px;background-color: #f0f0f0;color: #999999;font-size: 12px">MUSIC</span>
          <span style="margin-left: 5px">{{item.title}}</span>
          <el-popconfirm
            icon="el-icon-info"
            iconColor="red"
            title="这段内容确定取消收藏吗？"
            confirmButtonType="danger"
            cancelButtonType="success"
            @onConfirm="deleteMsgCommentHandler()">
            <div class="msg-comment-del-button" slot="reference">
              <img src="@/assets/images/msg-delete.png" width="20" height="20">
            </div>
          </el-popconfirm>
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
  export default {
    name: "msgComment",
    data(){
      return{
        total:null,
        msgCommentList:[{name:'1',title:'ttt'}]
      }
    },
    methods:{
      deleteMsgCommentHandler(){

      },
      currentChangeHanlder(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  #msg-comment {
    .msg-comment-wrapper{
      .msg-comment{
        padding: 0 15px;
        min-height: 650px;
        .el-card-msg-comment{
          padding: 7px 0;
          border: 1px solid #d9d9d9;
          .msg-comment-del-button{
            float: right;
            margin-top: -2px;
            cursor: pointer;
          }
        }
      }
      .pagination-wrapper{
        text-align: center;
      }
    }
  }
</style>
