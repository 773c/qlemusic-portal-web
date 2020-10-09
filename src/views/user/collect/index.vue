<template>
  <div id="collect">
    <!--创建收藏夹-->
    <div class="create-favorite-wrapper">
      <el-button class="create-favorite-button" type="success" @click="isShowAddFavorite = true"><i
        class="el-icon-folder-add"></i> 新建收藏夹
      </el-button>
      <el-dialog
        :visible.sync="isShowAddFavorite"
        title="新建收藏夹"
        width="400px"
        center
        @open="createFavoriteOpenDialog"
        class="create-favorite-dialog"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :close-on-press-escape="false">
        <div class="favorite-dialog-wrapper">
          <label class="tabs-label">标题</label>
          <br><br>
          <el-input type="text" v-model="createFavoriteTitle" class="" placeholder="  请输入收藏夹的名称">
          </el-input>
          <br><br>
          <label class="tabs-label">描述（选填）</label>
          <br><br>
          <el-input type="textarea" v-model="createFavoriteDescription" class="favorite-dialog-input-description"
                    placeholder="  请输入描述内容" :rows="5">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowAddFavorite = false" plain>取 消</el-button>
            <el-button type="danger" @click="createFavoriteHandler">确 定</el-button>
          </div>
        </div>
      </el-dialog>
      <div class="favorite-info-wrapper">
        <div class="favorite-description-wrapper">
          <span class="favorite-name">描述：</span>
          <span class="description-content">{{currentFavorite.description===''?defaultFavoriteDescription:currentFavorite.description}}</span>
          <el-tooltip class="item" effect="light" content="添加描述" placement="top">
            <i class="el-icon-edit" style="color: black;font-size: 14px;cursor:pointer;margin-left: 8px"></i>
          </el-tooltip>
        </div>
        <div class="favorite-name-wrapper">
          <span class="favorite-name">收藏夹名称：</span>
          <span class="name-content">{{currentFavorite.title===''? '默认' :currentFavorite.title}}</span>
          <el-tooltip class="item" effect="light" content="修改名称" placement="top">
            <i class="el-icon-edit" style="color: black;font-size: 14px;cursor:pointer;margin-left: 8px"></i>
          </el-tooltip>
        </div>
        <div class="favorite-edit-wrapper">
          <el-button type="text" @click="removeEmptyFavoriteHandler">删除收藏夹</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="isShowBatchMoveContentModel = true">批量移动</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text">设为私密</el-button>
          <!--删除收藏夹模块-->
          <el-dialog
            title="删除收藏夹"
            :visible.sync="isShowDelFavoriteModel"
            class="remove-favorite-dialog"
            width="400px"
            center
            @open="removeFavoriteOpenDialog"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :close-on-press-escape="false">
            <div class="remove-favorite-dialog-wrapper">
              <label class="tabs-label">收藏夹的内容</label>
              <div class="remove-favorite-dialog-radio">
                <el-radio v-model="radio" label="1">
                  <el-select v-model="moveFavoriteIndex" placeholder="移动到其他收藏夹">
                    <el-option
                      v-if="index>0"
                      v-for="(item,index) in favoriteTabs"
                      :key="item.name"
                      :label="item.title"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-radio>
              </div>
              <div class="remove-favorite-dialog-radio">
                <el-radio v-model="radio" label="2">一并删除（收藏夹和内容）</el-radio>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="isShowDelFavoriteModel = false" plain>取 消</el-button>
                <el-button type="danger" @click="removeFavoriteHandler">确 定</el-button>
              </div>
            </div>
          </el-dialog>
          <!--批量移动模块-->
          <el-dialog
            title="批量移动"
            :visible.sync="isShowBatchMoveContentModel"
            class="batch-move-content-dialog"
            width="955px"
            center
            @open="batchMoveContentOpenDialog"
            @close="batchMoveContentCloseDialog"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :close-on-press-escape="false">
            <div class="batch-move-content-dialog-wrapper">
              <span>移动的目标：</span>
              <el-select v-model="bathMoveFavoriteIndex" placeholder="移动到其他收藏夹">
                <el-option
                  v-if="item.title!==currentFavorite.title"
                  v-for="(item,index) in favoriteTabs"
                  :key="item.name"
                  :label="item.title"
                  :value="index">
                </el-option>
              </el-select>
              <div class="transfer-wrapper">
                <el-transfer
                  v-model="batchMoveTargetValue"
                  :data="batchMoveData"
                  :titles="[currentFavorite.title,bathMoveFavoriteIndex === null?'收藏夹名称':favoriteTabs[bathMoveFavoriteIndex].title]">
                </el-transfer>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="isShowBatchMoveContentModel = false" plain>取 消</el-button>
                <el-button type="danger" @click="batchMoveContentHandler">确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="favorites-wrapper">
      <el-tabs
        v-model="favoriteTabsValue"
        type="card"
        @tab-click="favoriteSelect">
        <el-tab-pane
          :id="'favoriteId'+item.name"
          v-for="(item, index) in favoriteTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name">
          <el-tabs tab-position="left" style="height: 650px;" @tab-click="collectTypeSelect">
            <div class="collect-resource-empty-img" v-show="isEmptyData">
              <img src="@/assets/images/empty.png" width="500">
            </div>
            <el-tab-pane label="全部">
              <div style="padding: 0 15px;min-height: 650px;">
                <el-card
                  :body-style="{padding:'18px'}"
                  shadow="hover"
                  class="el-card-collect-resource"
                  v-for="(item, index) in collectContentList"
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
                    @onConfirm="cancelCollectHandler(item.collectMusicId,index)">
                    <div class="collect-icon-wrapper" slot="reference">
                      <img src="@/assets/images/collect.png" width="20" height="20">
                    </div>
                  </el-popconfirm>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="音乐">
              <div style="padding: 0 15px;min-height: 650px">
                <el-card
                  :body-style="{padding:'18px'}"
                  shadow="hover"
                  class="el-card-collect-resource"
                  v-for="(item, index) in collectContentList"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name">
                  <span>{{item.title}}</span>
                  <el-popconfirm
                    icon="el-icon-info"
                    iconColor="red"
                    title="这段内容确定取消收藏吗？"
                    confirmButtonType="danger"
                    cancelButtonType="success"
                    @onConfirm="cancelCollectHandler()">
                    <div class="collect-icon-wrapper" slot="reference">
                      <img src="@/assets/images/collect.png" width="20" height="20">
                    </div>
                  </el-popconfirm>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="下载">
              <div style="padding: 0 15px;min-height: 650px">
              </div>
            </el-tab-pane>
            <el-tab-pane label="问答">
              <div style="padding: 0 15px;min-height: 650px">
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination
          @current-change="currentChangeHanlder"
          :hide-on-single-page="false"
          layout="prev,pager,next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {
    createCollect,
    getFavoriteList,
    deleteCollectContent,
    deleteCollect,
    deleteCollectAndMove,
    deleteCollectAndContent,
    batchMoveContent
  } from "@/api/collect";
  import {getMusicByCollectId} from "@/api/bbsMusic";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    userId: null,
    collectId: null
  };
  export default {
    name: "collect",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        total: null,
        isShowAddFavorite: false,
        createFavoriteTitle: '默认',
        createFavoriteDescription: '',
        currentFavorite: {
          id: 0,
          title: '',
          name: '',
          description: '',
          index: 0
        },
        favoriteTabsValue: '1',
        isShowDelFavoriteModel: false,
        isShowBatchMoveContentModel: false,
        isEmptyData: true,
        moveFavoriteIndex: null,
        bathMoveFavoriteIndex: null,
        radio: '1',
        favoriteTabs: [],
        defaultFavoriteId: null,
        defaultFavoriteDescription:'请添加收藏夹描述内容',
        collectContentList: [],
        tabIndex: 0,
        batchMoveData: [],
        batchMoveTargetValue: []
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
    },
    watch:{
      collectContentList(val,oldVal){
        if(val.length === 0){
          this.isEmptyData = true
        }
      }
    },
    methods: {
      //获取收藏夹集合
      favoriteList() {
        getFavoriteList(this.userInfo.id).then(response => {
          let data = response.data
          let item = null
          for (item of data) {
            //tab标签索引自增
            let newTabName = ++this.tabIndex + '';
            //收藏夹描述超出长度修饰
            let description = item.description
            if (description !== null && description.length > 47) {
              let prefix = description.substring(0, 45)
              description = prefix + '...'
            }
            //存入数组中
            this.favoriteTabs.push({
              id: item.id,
              title: item.name,
              name: newTabName,
              description: item.description === null ? this.defaultFavoriteDescription : description
            });
          }
          //初始化默认收藏夹内容
          this.collectMusicList(0)
        })
      },
      //新建收藏夹模块内容打开重置
      createFavoriteOpenDialog() {
        this.createFavoriteTitle = ''
        this.createFavoriteDescription = ''
      },
      //新建收藏夹
      createFavoriteHandler() {
        let flag = false
        this.favoriteTabs.forEach((tab, index) => {
          if (this.createFavoriteTitle === tab.title) {
            flag = true
          }
        })
        if (flag) {
          this.$tip.error('收藏夹已存在')
        } else if (this.createFavoriteTitle === '' || this.createFavoriteTitle === null) {
          this.$tip.error('标题不能为空')
        } else {
          createCollect(
            this.userInfo.id,
            this.createFavoriteTitle,
            this.createFavoriteDescription)
            .then(response => {
              let newTabName = ++this.tabIndex + '';
              this.favoriteTabs.push({
                id: response.data,
                title: this.createFavoriteTitle,
                name: newTabName,
                description: this.createFavoriteDescription === ''?this.defaultFavoriteDescription:this.createFavoriteDescription
              });
              this.isShowAddFavorite = false
              this.$tip.success('操作成功')
            })
        }
      },
      //获取对应收藏夹内容
      collectMusicList(index) {
        console.log("收藏夹id："+this.favoriteTabs[index].id);
        this.listQuery.collectId = this.favoriteTabs[index].id
        getMusicByCollectId(this.listQuery).then(response => {
          let data = response.data
          let list = data.list
          this.total = data.total
          if (list.length === 0) {
            this.isEmptyData = true
          } else {
            this.isEmptyData = false
          }
          this.collectContentList = list
        })
      },
      //收藏夹被选中触发
      favoriteSelect(tab, event) {
        //更新收藏夹id,名称和描述
        this.currentFavorite.id = this.favoriteTabs[tab.index].id
        this.currentFavorite.title = tab.label
        this.currentFavorite.name = tab.name
        this.currentFavorite.description = this.favoriteTabs[tab.index].description
        this.currentFavorite.index = tab.index
        //获取对应收藏夹内容
        this.collectMusicList(tab.index)
      },
      //收藏类型被选中触发
      collectTypeSelect(tab, event) {
        if (tab.label !== '音乐' && tab.label !== '全部') {
          this.isEmptyData = true
        } else {
          this.isEmptyData = false
        }
      },
      //取消收藏
      cancelCollectHandler(collectContentId, index) {
        deleteCollectContent(collectContentId).then(response => {
          //从数组中移除元素
          this.collectContentList.splice(index, 1)
        })
      },
      //从收藏夹tab中移除收藏夹
      removeElFromFavoriteTabs() {
        //从收藏夹数组中移除元素
        let tabs = this.favoriteTabs;
        let activeName = this.favoriteTabsValue;
        let targetName = this.currentFavorite.name
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.favoriteTabsValue = '1';
        this.currentFavorite.title = '默认'
        this.currentFavorite.description = this.favoriteTabs[0].description
        this.favoriteTabs = tabs.filter(tab => tab.name !== targetName);
      },
      //删除收藏夹模块内容重置
      removeFavoriteOpenDialog() {
        this.radio = '1'
        this.moveFavoriteIndex = ''
      },
      //删除为空收藏夹
      removeEmptyFavoriteHandler() {
        //如何收藏夹为默认，则不可删除
        if (this.currentFavorite.title === '默认' || this.currentFavorite.title === '') {
          this.$tip.error('不能删除默认收藏夹')
          //如果收藏夹为空，直接删除
        } else if (this.isEmptyData) {
          deleteCollect(this.currentFavorite.id).then(response => {
            //从收藏夹tab中移除收藏夹
            this.removeElFromFavoriteTabs()
            this.$tip.success('操作成功')
            //获取对应收藏夹内容
            this.collectMusicList(0)
          })
        } else {
          //否则不为空，打开选择模型
          this.isShowDelFavoriteModel = true
        }
      },
      //删除不为空的收藏夹
      removeFavoriteHandler() {
        //选择将内容移动到其他收藏夹
        if (this.radio === '1') {
          let moveFavorite = this.favoriteTabs[this.moveFavoriteIndex]
          //如果移动目标为空时
          if (this.moveFavoriteIndex === '' || this.moveFavoriteIndex === null) {
            //选择移动到的目标提示信息
            this.$tip.error('请选择移动目标的收藏夹')
          }
          else if (moveFavorite.title === this.currentFavorite.title) {
            //移动到同一收藏夹时提示信息
            this.$tip.error('不能移动到需要删除的收藏夹')
          }
          else {
            //移动到其他收藏夹
            deleteCollectAndMove(this.currentFavorite.id, moveFavorite.id).then(response => {
              this.isShowDelFavoriteModel = false
              //从数组中移除元素
              this.collectContentList.splice(0, this.collectContentList.length)
              //从收藏夹tab中移除收藏夹
              this.removeElFromFavoriteTabs()
              this.$tip.success('操作成功')
            })
          }
        } else if (this.radio === '2') {
          //删除收藏夹和内容
          deleteCollectAndContent(this.currentFavorite.id).then(response => {
            this.isShowDelFavoriteModel = false
            //从数组中移除元素
            this.collectContentList.splice(0, this.collectContentList.length)
            //从收藏夹tab中移除收藏夹
            this.removeElFromFavoriteTabs()
            this.$tip.success('操作成功')
          })
        }
      },
      //批量移动模块点击处理
      batchMoveContentOpenDialog() {
        //被移动收藏夹内容
        this.collectContentList.forEach((music, index) => {
          this.batchMoveData.push({
            key: music.collectMusicId,
            label: music.title
          });
        })
        //目标收藏夹内容
        // this.listQuery.collectId = this.favoriteTabs[1].id
        // getMusicByCollectId(this.listQuery).then(response => {
        //   let list = response.data.list
        //   console.log(list);
        //   list.forEach((music,index) => {
        //     this.batchMoveData.push({
        //       key: index,
        //       label: music.title
        //     })
        //   })
        // })
      },
      batchMoveContentCloseDialog() {
        //清除批量移动数据
        this.batchMoveData.splice(0, this.batchMoveData.length)
        //清除移动目标的选择框内容
        this.bathMoveFavoriteIndex = null
      },
      //批量移动请求处理
      batchMoveContentHandler() {
        if (this.bathMoveFavoriteIndex === null) {
          this.$tip.error('请选择收藏夹')
        } else if (this.batchMoveTargetValue.length === 0) {
          this.$tip.error('请选择需要移动的内容')
        } else {
          let data = new URLSearchParams()
          data.append("collectMusicIds", this.batchMoveTargetValue)
          data.append("id", this.favoriteTabs[this.bathMoveFavoriteIndex].id)
          batchMoveContent(data).then(response => {
            this.isShowBatchMoveContentModel = false
            //重新获取收藏夹内容
            this.collectMusicList(this.currentFavorite.index)
            //清除批量移动数据
            this.batchMoveData.splice(0, this.batchMoveData.length)
            this.batchMoveTargetValue.splice(0, this.batchMoveTargetValue.length)
          })
        }
      },
      //切换分页数pageNum
      currentChangeHanlder(pageNum) {
        this.listQuery.pageNum = pageNum
        this.collectMusicList(this.currentFavorite.index)
      }
    },
    created() {
      //初始化收藏夹
      this.favoriteList()
      //将用户id赋值
      this.listQuery.userId = this.userInfo.id
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  //收藏
  #collect {
    //创建收藏夹div
    .create-favorite-wrapper {
      .create-favorite-button {
        font-size: 15px;
        height: 38px;
        border-radius: 50px;
      }
      .create-favorite-dialog {
        margin-top: 50px;
        .favorite-dialog-wrapper {
          margin-top: -20px;
          padding: 0 20px;
          .dialog-footer {
            margin-top: 20px;
            text-align: center;
          }
        }
      }
      //收藏夹信息
      .favorite-info-wrapper {
        height: 58px !important;
        width: 720px;
        float: right;
        .favorite-name-wrapper {
          margin-top: 5px;
          width: 220px;
          float: right;
          .favorite-name {
            font-size: 14px;
            border: 1px solid rgb(210, 210, 210);
            padding: 7px 3px 7px 10px;
            border-radius: 3px;
            color: #8c939d;
          }
          .name-content {
            width: auto;
            margin-left: 8px;
            font-size: 14px;
            color: #fe0000;
          }
        }
        .favorite-description-wrapper {
          margin-top: 6px;
          font-size: 14px;
          float: right;
          .favorite-name {
            font-size: 13px;
            border: 1px solid rgb(210, 210, 210);
            padding: 7px 3px 7px 10px;
            border-radius: 3px;
            color: #8c939d;
          }
          .description-tag {
            float: left;
          }
          .description-content {
            width: auto;
            margin-left: 6px;
          }
        }
        //收藏夹编辑
        .favorite-edit-wrapper {
          clear: both;
          padding-top: 8px;
          text-align: right;
          .el-button--text {
            color: #0066cc;
          }
          //删除收藏夹
          .remove-favorite-dialog {
            .remove-favorite-dialog-wrapper {
              margin-top: -20px;
              padding: 0 20px;
              .remove-favorite-dialog-radio {
                margin-top: 20px;
              }
              .dialog-footer {
                margin-top: 20px;
                text-align: right;
              }
            }
          }
          //批量移动
          .batch-move-content-dialog {
            .batch-move-content-dialog-wrapper {
              .transfer-wrapper {
                margin-top: 30px;
              }
              .dialog-footer {
                text-align: center;
                margin-top: 50px;
              }
            }
          }
        }
      }
    }
    //收藏夹内容div
    .favorites-wrapper {
      margin-top: 20px;
      .collect-resource-empty-img {
        position: relative;
        top: 100px;
        left: 38%;
      }
      .el-card-collect-resource {
        margin-bottom: 10px;
        border: 1px solid rgb(230, 230, 230);
        font-size: 14px;
        .collect-icon-wrapper {
          float: right;
          margin-top: -3px;
        }
      }
      .el-card-collect-resource:hover {
        color: #fe0000;
        cursor: pointer;
      }
      .pagination-wrapper {
        margin-top: 2px;
        text-align: center;
      }
    }
  }
</style>
